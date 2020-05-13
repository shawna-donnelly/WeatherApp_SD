import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { config } from "../../env";
import { getMonthName, getWeather, getWindDirection, getDayName } from "../helpers/helper";

const WeatherMain = () => {
    const [{ showMain, showDetail, detailObject }, setShown] = useState({
        showMain: true,
        showDetail: false,
        detailObject: undefined
    });
    const [{ dt, main, wind, weather, name, date, description }, setCurrentWeatherData] = useState({
        currentDT: undefined,
        currentMain: undefined,
        currentWind: undefined,
        currentWeather: undefined,
        city: undefined,
        date: undefined,
        description: undefined
    });
    const [forecastData, setForecastWeatherData] = useState(undefined);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=dallas&units=imperial&appid=${config.WEAHTER_API}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response =>
                response.json().then(json => {
                    setCurrentWeatherData({
                        ...json,
                        date: new Date(json.dt * 1000),
                        description: json.weather[0].main
                            .split(" ")
                            .map(item => item.charAt(0).toUpperCase() + item.slice(1))
                    });
                })
            )
            .catch(e => console.log(e.message));

        return () => {
            console.log("Unmount");
        };
    }, []);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=dallas&units=imperial&appid=${config.WEAHTER_API}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response =>
                response.json().then(json => {
                    let weatherData = [];
                    let group = json.list.reduce((r, a) => {
                        r[a.dt_txt.split(" ")[0]] = [...(r[a.dt_txt.split(" ")[0]] || []), a];
                        return r;
                    }, {});

                    Object.keys(group).map(day => {
                        const resultMin = group[day].reduce(function(res, obj) {
                            return obj.main.temp_min < res.main.temp_min ? obj : res;
                        });

                        const resultMax = group[day].reduce(function(res, obj) {
                            return obj.main.temp_max > res.main.temp_max ? obj : res;
                        });

                        const avgHumidity =
                            group[day].reduce((total, next) => total + next.main.humidity, 0) / group[day].length;

                        const avgPressure =
                            group[day].reduce((total, next) => total + next.main.pressure, 0) / group[day].length;

                        const avgSpeed =
                            group[day].reduce((total, next) => total + next.wind.speed, 0) / group[day].length;

                        const avgDir = group[day].reduce((total, next) => total + next.wind.deg, 0) / group[day].length;

                        let minTemp = resultMin.main.temp_min;
                        let maxTemp = resultMax.main.temp_max;
                        let direction = getWindDirection(avgDir);

                        let counts = {};
                        let groupDay = group[day];

                        for (let i = 0; i < groupDay.length; ++i) {
                            let weatherObject = groupDay[i].weather[0];
                            if (counts[weatherObject.icon + " " + weatherObject.main] !== undefined) {
                                counts[weatherObject.icon + " " + weatherObject.main] =
                                    counts[weatherObject.icon + " " + weatherObject.main] + 1;
                                continue;
                            }
                            counts[weatherObject.icon + " " + weatherObject.main] = 1;
                        }

                        let highest = Object.keys(counts)[0];

                        Object.keys(counts).forEach(count => {
                            highest = counts[highest] >= counts[count] ? highest : count;
                        });

                        weatherData.push({
                            minTemp,
                            maxTemp,
                            avgHumidity,
                            avgPressure,
                            avgSpeed,
                            avgDir,
                            direction,
                            date: new Date(group[day][0].dt * 1000),
                            weatherIcon: highest.split(" ")[0],
                            weatherDescription: highest.split(" ")[1]
                        });
                    });
                    setForecastWeatherData(weatherData);
                })
            )
            .catch(e => console.log(e.message));

        return () => {
            console.log("Unmount");
        };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
            {showMain && (
                <View style={{ flex: 1 }}>
                    {main && (
                        <TouchableOpacity
                            onPress={() =>
                                setShown({
                                    showMain: false,
                                    showDetail: true,
                                    detailObject: {
                                        date,
                                        avgHumidity: main.humidity,
                                        avgPressure: main.pressure,
                                        minTemp: main.temp_min,
                                        maxTemp: main.temp_max,
                                        avgDir: wind.deg,
                                        avgSpeed: wind.speed
                                    }
                                })
                            }
                            style={{ backgroundColor: "#3aade4", justifyContent: "space-evenly" }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    padding: 10,
                                    backgroundColor: "#3aade4"
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "flex-start",
                                        paddingLeft: "10%"
                                    }}
                                >
                                    <Text style={{ fontSize: 18, color: "white" }}>{`Today, ${getMonthName(
                                        date.getMonth()
                                    )} ${date.getDate()}`}</Text>
                                    <Text style={styles.largeText}>
                                        {Math.round(main.temp)} {"\u00b0"}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    {getWeather(weather[0].icon, "large")}
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignContent: "center",
                                    paddingBottom: 10
                                }}
                            >
                                <View style={{ flex: 1, paddingLeft: "15%" }}>
                                    <Text style={[styles.smallText]}>
                                        {Math.round(main.temp_min)} {"\u00b0"}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        alignContent: "center",
                                        justifyContent: "center",
                                        paddingRight: "3%"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: "white",
                                            textAlignVertical: "center",
                                            textAlign: "center"
                                        }}
                                    >
                                        {description.join(" ")}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    {forecastData &&
                        forecastData.map((day, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShown({
                                            showMain: !showMain,
                                            showDetail: !showDetail,
                                            detailObject: { ...day, index }
                                        });
                                    }}
                                    style={{ flex: 1, flexDirection: "row" }}
                                    key={day.date}
                                >
                                    {getWeather(day.weatherIcon)}
                                    <View style={{ flex: 3, padding: 10 }}>
                                        <Text style={{ fontSize: 18 }}>
                                            {index === 0 ? "Tomorrow" : getDayName(day.date.getDay())}
                                        </Text>
                                        <Text style={{ fontSize: 12 }}>{day.weatherDescription}</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: "center" }}>
                                            {Math.round(day.maxTemp)}
                                            {"\u00b0"}
                                        </Text>
                                        <Text style={{ fontSize: 14, textAlign: "center" }}>
                                            {Math.round(day.minTemp)}
                                            {"\u00b0"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            )}
            {showDetail && (
                <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {detailObject.index === 0 ? "Tomorrow" : getDayName(detailObject.date.getDay())}
                    </Text>
                    <Text style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}>
                        {getMonthName(detailObject.date.getMonth())} {detailObject.date.getDate()}
                    </Text>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 100 }}>
                                {Math.round(detailObject.maxTemp)}
                                {"\u00b0"}
                            </Text>
                            <Text style={{ fontSize: 50, color: "grey" }}>
                                {Math.round(detailObject.minTemp)}
                                {"\u00b0"}
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            {getWeather(detailObject.weatherIcon, "large")}
                            <Text
                                style={{ textAlignVertical: "center", fontSize: 12, marginTop: "18%", color: "grey" }}
                            >
                                {detailObject.weatherDescription}
                            </Text>
                        </View>
                    </View>
                    <Text>Humidity: {Math.round(detailObject.avgHumidity)}%</Text>
                    <Text>Pressure: {Math.round(detailObject.avgPressure)} hPa</Text>
                    <Text>
                        Wind: {Math.round(detailObject.avgSpeed)} km/h{" "}
                        {getWindDirection(parseFloat(detailObject.avgDir))}
                    </Text>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={() => setShown({ showMain: true, showDetail: false, detailObject: undefined })}
                            title="Back"
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    smallText: {
        fontSize: 30,
        color: "white"
    },
    largeText: {
        fontSize: 60,
        marginTop: 10,
        color: "white"
    }
});

export default WeatherMain;
