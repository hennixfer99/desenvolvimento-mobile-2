import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import imperialLogo from "./assets/images/logo-imperial.png";
import { GlobalColors } from "./constants/colors";
import Routes from "./routes";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.7;

const MENU_ITEMS = [
    { key: "Home", label: "Início", icon: "home-outline" },
    {
        key: "QuemSomos",
        label: "Quem Somos",
        icon: "information-circle-outline",
    },
    { key: "Solucoes", label: "Soluções", icon: "bulb-outline" },
    { key: "Servicos", label: "Serviços", icon: "construct-outline" },
    { key: "Principios", label: "Princípios", icon: "flag-outline" },
    { key: "Depoimentos", label: "Depoimentos", icon: "chatbubbles-outline" },
    { key: "Clientes", label: "Clientes", icon: "people-outline" },
    { key: "Contato", label: "Contato", icon: "call-outline" },
];

export default function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const drawerAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
    const scrollRef = useRef(null);
    const sectionPositions = useRef({});

    const openDrawer = () => {
        setDrawerVisible(true);
        setDrawerOpen(true);
        Animated.timing(drawerAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnim, {
            toValue: DRAWER_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setDrawerVisible(false);
            setDrawerOpen(false);
        });
    };

    const toggleDrawer = () => {
        if (drawerOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };

    const registerSection = (key, y) => {
        sectionPositions.current[key] = y;
    };

    const scrollToSection = (key) => {
        if (sectionPositions.current[key] !== undefined) {
            scrollRef.current?.scrollTo({
                y: sectionPositions.current[key],
                animated: true,
            });
        }
        if (drawerOpen) closeDrawer();
    };

    return (
        <View style={s.rootContainer}>
            <SafeAreaView style={s.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={GlobalColors.PRIMARY_DARK}
                />

                <View style={s.header}>
                    <View style={s.headerLogo}>
                        <Image
                            source={imperialLogo}
                            style={s.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={s.headerSpacer} />
                    <TouchableOpacity
                        onPress={toggleDrawer}
                        style={s.menuButton}
                    >
                        <Ionicons
                            name="menu"
                            size={28}
                            color={GlobalColors.WHITE}
                        />
                    </TouchableOpacity>
                </View>

                <Routes
                    scrollRef={scrollRef}
                    onSectionLayout={registerSection}
                    scrollToSection={scrollToSection}
                />
            </SafeAreaView>

            {drawerVisible && (
                <TouchableOpacity
                    style={s.overlay}
                    activeOpacity={1}
                    onPress={closeDrawer}
                />
            )}

            {drawerVisible && (
                <Animated.View
                    style={[
                        s.drawer,
                        { transform: [{ translateX: drawerAnim }] },
                    ]}
                >
                    <View style={s.drawerHeader}>
                        <Text style={s.drawerTitle}>
                            IMPERIAL{"\n"}ENGENHARIA
                        </Text>
                        <TouchableOpacity onPress={closeDrawer}>
                            <Ionicons
                                name="close"
                                size={24}
                                color={GlobalColors.WHITE}
                            />
                        </TouchableOpacity>
                    </View>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={s.drawerItem}
                            onPress={() => scrollToSection(item.key)}
                        >
                            <Ionicons
                                name={item.icon}
                                size={20}
                                color={GlobalColors.WHITE}
                            />
                            <Text style={s.drawerItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    rootContainer: {
        flex: 1,
        overflow: "hidden",
    },
    container: {
        flex: 1,
        backgroundColor: GlobalColors.PRIMARY_DARK,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: GlobalColors.PRIMARY_DARK,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerLogo: {
        width: 32,
        height: 32,
    },
    logoImage: {
        width: "100%",
        height: "100%",
    },
    headerSpacer: {
        flex: 1,
    },
    menuButton: {
        padding: 5,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 5,
    },
    drawer: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: GlobalColors.PRIMARY_DARK,
        zIndex: 10,
        paddingTop: 50,
        elevation: 10,
    },
    drawerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.15)",
        marginBottom: 10,
    },
    drawerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalColors.WHITE,
        lineHeight: 22,
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    drawerItemText: {
        fontSize: 15,
        color: GlobalColors.WHITE,
        marginLeft: 15,
    },
});
