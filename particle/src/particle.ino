#include "lib/beacon-scanner/BeaconScanner.h"

int LED_pin = D7;
bool LED_state = false;

void onCallback(Beacon &beacon, callback_type type)
{
  String address = beacon.getAddress().toString().c_str();
  String status = (type == NEW) ? "In" : "Out";
  Particle.publish(address, status);
}

bool toggle_LED(String command)
{
  if (!LED_state)
  {
    digitalWrite(LED_pin, HIGH);
    LED_state = true;
  }
  else
  {
    digitalWrite(LED_pin, LOW);
    LED_state = false;
  }
  return LED_state;
}

void setup()
{
  // LED control
  pinMode(LED_pin, OUTPUT);
  digitalWrite(LED_pin, LOW);
  Particle.function("toggleLED", toggle_LED);

  // Beacon scanner functions
  Scanner.setCallback(onCallback);
  Scanner.setScanPeriod(1);
  Scanner.startContinuous();
}

void loop()
{
  Scanner.loop();
}