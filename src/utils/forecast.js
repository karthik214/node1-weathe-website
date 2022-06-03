const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4f3d9d592c1319893309be4ab4530dfb&query=" +
    latitude +
    "," +
    longitude +
    "";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = {
        name: body.location.name,
        currentTemp: body.current.temperature,
        dataFeelslikeTemp: body.current.feelslike,
        weatherDescription: body.current.weather_descriptions[0],
        humidity: body.current.humidity,
        observedTime: body.current.observation_time,
      };
      callback(
        undefined,
        "In " +
          data.name +
          " it is " +
          data.weatherDescription +
          ". Currently " +
          data.currentTemp +
          " degree out. Feels like " +
          data.dataFeelslikeTemp +
          " degree. And Humidity is " +
          data.humidity +
          ". This data is observerd at " +
          data.observedTime +
          "%"
      );
    }
  });
};

module.exports = forecast;
