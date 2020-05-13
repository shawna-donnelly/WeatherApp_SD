import React from "react";
import { Image } from "react-native";

export const getMonthName = month => {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return months[month];
};

export const getDayName = day => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
};

export const getWindDirection = degrees => {
    let dir = "";
    if (degrees > 0 && degrees < 22.5) {
        dir = "N";
    } else if (degrees <= 67.5) {
        dir = "NE";
    } else if (degrees <= 112.5) {
        dir = "E";
    } else if (degrees <= 157.5) {
        dir = "SE";
    } else if (degrees <= 202.5) {
        dir = "S";
    } else if (degrees <= 247.5) {
        dir = "SW";
    } else if (degrees <= 292.5) {
        dir = "W";
    } else if (degrees <= 337.5) {
        dir = "NW";
    }
    return dir;
};

export const getWeather = (weather, size = "small") => {
    let img = "";
    let large = 125;
    let small = 35;

    switch (weather) {
        case "01n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_clear.png")}
                />
            );
            break;
        case "01d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_clear.png")}
                />
            );
            break;
        case "02n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_light_clouds.png")}
                />
            );
            break;
        case "02d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_light_clouds.png")}
                />
            );
            break;
        case "03n":
        case "04n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_cloudy.png")}
                />
            );
            break;
        case "03d":
        case "04d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_clouds.png")}
                />
            );
            break;
        case "09n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_light_rain.png")}
                />
            );
        case "09d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_light_rain.png")}
                />
            );
            break;
        case "10n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_rain.png")}
                />
            );
            break;
        case "10d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_rain.png")}
                />
            );
            break;
        case "11n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_storm.png")}
                />
            );
            break;
        case "11d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_storm.png")}
                />
            );
            break;
        case "13n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_snow.png")}
                />
            );
            break;
        case "13d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_snow.png")}
                />
            );
            break;
        case "50n":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/ic_fog.png")}
                />
            );
            break;
        case "50d":
            img = (
                <Image
                    style={{
                        width: size === "large" ? large : small,
                        height: size === "large" ? large : small,
                        alignSelf: "center"
                    }}
                    source={require("../../assets/art_fog.png")}
                />
            );
            break;
        default:
            img = null;
    }
    return img;
};
