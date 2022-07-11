#include "lib/beacon-scanner/BeaconScanner.h"

void onCallback(Beacon &beacon, callback_type type)
{
  String address = beacon.getAddress().toString().c_str();
  String status = (type == NEW) ? "In" : "Out";
  Particle.publish(address, status);
}

void setup()
{
  // LED control
  //  TODO

  // Beacon scanner functions
  Scanner.setCallback(onCallback);
  Scanner.setScanPeriod(2);
  Scanner.startContinuous();
}

void loop()
{
  Scanner.loop();
}