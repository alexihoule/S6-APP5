/*
 * Project labo
 * Description:
 * Author:
 * Date:
 */

// token : 4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892
// https://api.particle.io/v1/devices/e00fce68285fad1dccfa7f4a/test?access_token=4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892

int test = 0;
float test2 = 20.3;

void setup() {
  // Put initialization like pinMode and begin functions here.
  if (Particle.variable("test", test) == false)
  {
    Particle.variable("test", test);
  }

  //Particle.publish("test2", String::format("%.1f", test2));
}

void loop() {
  // The core of your code will likely live here.
  test++;
  //test2 *= 1.2;
  //Particle.publish("test2", String::format("%.1f", test2));
  delay(1000);
}