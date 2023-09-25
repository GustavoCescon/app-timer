import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
export default function Contador({
  minutos,
  segundos,
  setEstado,
  setSegundos,
  setMinutos,
  alarmes,
}) {
  var done = false;
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos(segundos - 1);
      if (parseInt(segundos) <= 0) {
        if (parseInt(minutos) > 0) {
          setMinutos(parseInt(minutos) - 1);
          setSegundos(59);
        } else {
          if (!done) {
            done = true;
            setEstado("selecionar");
            setMinutos(0);
            setSegundos(0);
            playSound();
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  async function playSound() {
    try {
      var alarme;
      alarmes.map((val) => {
        if (val.selecionado) {
          alarme = val.file;
        }
      });
      setSound(sound);
      const { sound } = await Audio.Sound.createAsync(alarme);
      await sound.playAsync();
    } catch (error) {}
  }

  async function playSound() {
    var alarme;
    alarmes.map((val) => {
      if (val.selecionado) {
        alarme = val.file;
      }
    });
    const { sound } = await Audio.Sound.createAsync(alarme);

    await sound.playAsync();
  }

  function resetar() {
    setEstado("selecionar");
    setMinutos(0);
    setSegundos(0);
  }

  function formatarNumero(number) {
    var finalNumber = "";
    if (number < 10) {
      finalNumber = "0" + number;
    } else {
      finalNumber = number;
    }

    return finalNumber;
  }
  var segundosFormatado = formatarNumero(parseInt(segundos));
  var minutosFormatado = formatarNumero(parseInt(minutos));
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(59,29,105,1)", "rgba(59,29,105,0.8)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.TextContador}>{minutosFormatado}:</Text>
        <Text style={styles.TextContador}>{segundosFormatado}</Text>
      </View>
      <TouchableOpacity onPress={() => resetar()} style={styles.btnIniciar}>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 30,
            color: "#fff",
            fontSize: 20,
          }}
        >
          Resetar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(80,50,168)",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  TextContador: {
    color: "#fff",
    fontSize: 40,
  },
  btnIniciar: {
    backgroundColor: "rgb(116,67,191)",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: "#fff",
    borderWidth: 2,
  },
});
