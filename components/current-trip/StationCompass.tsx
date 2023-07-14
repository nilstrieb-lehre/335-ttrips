import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import { Text, View } from "../Themed";
import { Subscription } from "expo-sensors/src/DeviceSensor";
import * as Location from "expo-location";
import { LocationObject, LocationSubscription } from "expo-location";
import { Coordinate } from "../../service/transport";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { targetAngle } from "../../service/tripping";

const { width } = Dimensions.get("window");

const COMPASS_MARGIN = 80;

const angle = (magnetometer: MagnetometerMeasurement) => {
  let angle = 0;
  if (magnetometer) {
    let { x, y } = magnetometer;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle);
};

type Props = {
  nextStation: Coordinate;
};

const StationCompass = ({ nextStation }: Props) => {
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

  const myAngle =
    location &&
    targetAngle(location.coords, {
      latitude: nextStation.x,
      longitude: nextStation.y,
    });

  return (
    <View>
      {errorMessage ? (
        <Text>errorMessage</Text>
      ) : (
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/compass_bg.png")}
            style={[
              styles.background,
              {
                height: width - COMPASS_MARGIN,
                transform: [{ rotate: 360 - magnetometer + "deg" }],
              },
            ]}
          />

          <FontAwesome
            style={[
              {
                height: width - COMPASS_MARGIN - 1,
                width: width - COMPASS_MARGIN - 1,
                marginLeft: COMPASS_MARGIN / 2,
                transform: [
                  { rotate: 360 - magnetometer + myAngle! + 90 + "deg" },
                ],
                textAlign: "center",
              },
              styles.icon,
            ]}
            name="train"
            size={50}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  background: {
    resizeMode: "contain",
  },
  icon: {
    color: "white",
    position: "absolute",
  },
});

export default StationCompass;
