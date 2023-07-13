import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import { Text, View } from "../Themed";
import { Subscription } from "expo-sensors/src/DeviceSensor";
import * as Location from "expo-location";
import { LocationObject, LocationSubscription } from "expo-location";

const { width } = Dimensions.get("window");

const angle = (magnetometer: MagnetometerMeasurement) => {
  let angle = 0;
  if (magnetometer) {
    let { x, y, z } = magnetometer;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle);
};

const StationCompass = () => {
  const [magnetometer, setMagnetometer] = useState(0);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationSubscription, setLocationSubscription] =
    useState<LocationSubscription | null>(null);

  useEffect(() => {
    Magnetometer.isAvailableAsync()
      .then((isAvailable) => {
        if (!isAvailable) {
          setErrorMessage("Magnetometer is not available");
        }
      })
      .catch(console.error);

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }
      Location.watchPositionAsync({}, setLocation).then(
        setLocationSubscription,
      );
    })();

    return () => {
      if (locationSubscription) locationSubscription.remove();
    };
  }, []);

  useEffect(() => {
    let sub: Subscription | null;
    if (!errorMessage) {
      sub = Magnetometer.addListener((data) => setMagnetometer(angle(data)));
    } else {
      sub = null;
    }
    return () => {
      if (sub) sub.remove();
    };
  }, [errorMessage]);

  return (
    <View>
      {errorMessage ? (
        errorMessage
      ) : (
        <>
          <Image
            source={require("../../assets/images/compass_bg.png")}
            style={{
              height: width - 80,
              resizeMode: "contain",
              transform: [{ rotate: 360 - magnetometer + "deg" }],
            }}
          />
          <Text>{JSON.stringify(location)}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default StationCompass;
