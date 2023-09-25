import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import Contador from "./contador";

export default function App() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);

  const [alarmeSound, setAlarmeSound] = useState([
    {
      id: 1,
      selecionado: true,
      som: "alarme 1",
      file: require("./assets/alarme1.mp3"),
    },
    {
      id: 2,
      selecionado: false,
      som: "alarme 2",
      file: require("./assets/alarme2.mp3"),
    },
  ]);
  const [estado, setEstado] = useState("selecionar");

  var numero = [];
  for (let index = 1; index <= 60; index++) {
    numero.push(index);
  }
  function setAlarme(id) {
    let alarmesTemp = alarmeSound.map((val) => {
      if (id != val.id) val.selecionado = false;
      else val.selecionado = true;

      return val;
    });

    setAlarmeSound(alarmesTemp);
  }

  if (estado === "selecionar") {
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
        <Text style={{ color: "#fff", fontSize: 30 }}>
          Selecione o seu tempo
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "#fff", paddingTop: 16 }}>Min:</Text>
          <Picker
            selectedValue={minutos}
            style={{ height: 50, width: 150, color: "#fff" }}
            onValueChange={(itemValue, itemIndex) => setMinutos(itemValue)}
          >
            <Picker.Item label="0" value="0" />
            {numero.map((val) => {
              return (
                <Picker.Item label={val.toString()} value={val.toString()} />
              );
            })}
          </Picker>
          <Text style={{ color: "#fff", paddingTop: 16 }}>Seg:</Text>
          <Picker
            selectedValue={segundos}
            style={{ height: 50, width: 150, color: "#fff" }}
            onValueChange={(itemValue, itemIndex) => setSegundos(itemValue)}
          >
            <Picker.Item label="0" value="0" />
            {numero.map((val) => {
              return (
                <Picker.Item label={val.toString()} value={val.toString()} />
              );
            })}
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {alarmeSound.map((val) => {
            if (val.selecionado) {
              return (
                <TouchableOpacity
                  onPress={() => setAlarme(val.id)}
                  style={styles.btnEscolherSelecionado}
                >
                  <Text style={{ color: "white" }}>{val.som}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => setAlarme(val.id)}
                  style={styles.btnEscolher}
                >
                  <Text style={{ color: "white" }}>{val.som}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>

        <TouchableOpacity
          onPress={() => setEstado("iniciar")}
          style={styles.btnIniciar}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: 30,
              color: "#fff",
              fontSize: 20,
            }}
          >
            Iniciar
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (estado === "iniciar") {
    return (
      <Contador
        minutos={minutos}
        segundos={segundos}
        setEstado={setEstado}
        setMinutos={setMinutos}
        setSegundos={setSegundos}
        alarmes={alarmeSound}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(80,50,168)",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  btnEscolher: {
    marginRight: 5,
    marginBottom: 5,
    padding: 8,
    backgroundColor: "rgb(116,67,191)",
  },
  btnEscolherSelecionado: {
    marginRight: 5,
    marginBottom: 5,
    padding: 8,
    backgroundColor: "rgba(116,67,191, 0.3)",
    borderColor: "#fff",
    borderWidth: 1,
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
