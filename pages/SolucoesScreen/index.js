import { createElement } from "react";
import {
    View, Text, StyleSheet, Platform, TouchableOpacity, Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SectionTitle from "../../components/SectionTitle";
import ServiceCard from "../../components/ServiceCard";
import { GlobalColors } from "../../constants/colors";

/* ─── WebView — só importa no nativo ────────────────── */
let WebView = null;
if (Platform.OS !== "web") {
    try { WebView = require("react-native-webview").WebView; } catch {}
}

/* ─── Soluções ──────────────────────────────────────── */
const SOLUTIONS = [
    {
        icon: "search",
        title: "Inspeções e Vistorias",
        description: "Em conformidade com a legislação e normas técnicas",
    },
    {
        icon: "document-text",
        title: "Projetos",
        description:
            "Personalização de soluções de acordo com as práticas e padrões reconhecidos da engenharia",
    },
    {
        icon: "build",
        title: "Planos de Manutenção",
        description:
            "Garantir a confiabilidade operacional e segurança para as instalações e pessoas",
    },
    {
        icon: "people",
        title: "Treinamentos e Gestão",
        description:
            "Padronizar e compartilhar metodologias e estratégias corporativas",
    },
];

/* ── Coordenadas do escritório ─────────────────────── */
const OFFICE_LAT = -24.0058;
const OFFICE_LNG = -46.4028;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`;

/* ── HTML Leaflet + OpenStreetMap ───────────────────── */
const MAP_HTML = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%}
.leaflet-popup-content-wrapper{border-radius:10px}
.leaflet-popup-content b{color:#1A7A54;font-size:14px}
.leaflet-popup-content{font-size:12px;line-height:1.6}
</style>
</head><body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
var map=L.map('map',{center:[${OFFICE_LAT},${OFFICE_LNG}],zoom:16,zoomControl:true});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'&copy; OpenStreetMap',maxZoom:19
}).addTo(map);
L.marker([${OFFICE_LAT},${OFFICE_LNG}]).addTo(map)
 .bindPopup('<b>Imperial Engenharia</b><br>Av. Brasil, 600 - 4&deg; Andar, Sala 403<br>Boqueir&atilde;o, Praia Grande/SP')
 .openPopup();
</script>
</body></html>`;

/* ── Componente Mapa ───────────────────────────────── */
function OfficeMap() {
    const isWeb = Platform.OS === "web";
    const hasWebView = !isWeb && WebView;

    return (
        <View style={s.mapCard}>
            {/* ── Mapa visual ── */}
            <View style={s.mapContainer}>
                {hasWebView ? (
                    <WebView
                        source={{ html: MAP_HTML }}
                        style={s.mapWebView}
                        javaScriptEnabled
                        scrollEnabled={false}
                        originWhitelist={["*"]}
                        startInLoadingState
                    />
                ) : isWeb ? (
                    createElement("iframe", {
                        srcDoc: MAP_HTML,
                        style: { width: "100%", height: "100%", border: "none" },
                        title: "Mapa Imperial Engenharia",
                    })
                ) : (
                    <View style={s.mapPlaceholder}>
                        <Ionicons name="map-outline" size={40} color={GlobalColors.TEXT_LIGHT} />
                        <Text style={s.placeholderText}>Mapa indisponível</Text>
                    </View>
                )}
            </View>

            {/* ── Rodapé: endereço + botão ── */}
            <View style={s.mapFooter}>
                <View style={s.footerInfo}>
                    <Ionicons name="location-sharp" size={22} color={GlobalColors.PRIMARY} />
                    <View style={s.footerTexts}>
                        <Text style={s.footerTitle}>Imperial Engenharia</Text>
                        <Text style={s.footerAddr}>
                            Av. Brasil, 600 – 4° Andar · Boqueirão, Praia Grande/SP
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={s.openBtn}
                    onPress={() => Linking.openURL(MAPS_URL)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="navigate" size={16} color={GlobalColors.WHITE} />
                    <Text style={s.openBtnText}>Abrir no mapa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/* ── Tela Principal ────────────────────────────────── */
export default function SolucoesScreen() {
    return (
        <View style={s.container}>
            <SectionTitle text="Nossas Soluções" />

            <View style={s.cardsRow}>
                {SOLUTIONS.map((item, i) => (
                    <ServiceCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </View>

            <Text style={s.mapTitle}>Alcançando todo o Brasil!</Text>
            <Text style={s.mapSubtitle}>
                Trabalhamos com clientes em todo território nacional
            </Text>

            <OfficeMap />
        </View>
    );
}

/* ── Estilos ───────────────────────────────────────── */
const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.WHITE,
        padding: 20,
    },
    cardsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    mapTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    mapSubtitle: {
        fontSize: 14,
        color: GlobalColors.TEXT_MEDIUM,
        textAlign: "center",
        marginBottom: 20,
    },
    /* ── Card do mapa ── */
    mapCard: {
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        backgroundColor: GlobalColors.WHITE,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    mapContainer: {
        height: 280,
    },
    mapWebView: {
        flex: 1,
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: GlobalColors.BACKGROUND,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        color: GlobalColors.TEXT_LIGHT,
        fontSize: 13,
        marginTop: 8,
    },
    /* ── Rodapé do mapa ── */
    mapFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderTopWidth: 1,
        borderTopColor: GlobalColors.BORDER,
    },
    footerInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 12,
    },
    footerTexts: {
        marginLeft: 10,
        flex: 1,
    },
    footerTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
    },
    footerAddr: {
        fontSize: 11,
        color: GlobalColors.TEXT_MEDIUM,
        marginTop: 2,
    },
    openBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: GlobalColors.PRIMARY,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 8,
        gap: 6,
    },
    openBtnText: {
        color: GlobalColors.WHITE,
        fontWeight: "600",
        fontSize: 13,
    },
});
