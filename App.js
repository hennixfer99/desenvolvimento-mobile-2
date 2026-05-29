import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Footer from "./components/Footer";
import imperialLogo from "./assets/images/logo-imperial.png";
import { GlobalColors } from "./constants/colors";
import AdminScreen from "./pages/AdminScreen";
import InspecoesDetailScreen from "./pages/InspecoesDetailScreen";
import LoginScreen from "./pages/LoginScreen";
import ManutencaoDetailScreen from "./pages/ManutencaoDetailScreen";
import ProjetosDetailScreen from "./pages/ProjetosDetailScreen";
import TreinamentosDetailScreen from "./pages/TreinamentosDetailScreen";
import Routes from "./routes";
import { getSession, initApi, logout } from "./services/fakeApi";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.7;

const MENU_ITEMS = [
    { key: "Home", label: "Início", icon: "home-outline" },
    { key: "QuemSomos", label: "Quem Somos", icon: "information-circle-outline" },
    { key: "Solucoes", label: "Soluções", icon: "bulb-outline" },
    { key: "Servicos", label: "Serviços", icon: "construct-outline" },
    { key: "Principios", label: "Princípios", icon: "flag-outline" },
    { key: "Depoimentos", label: "Depoimentos", icon: "chatbubbles-outline" },
    { key: "Clientes", label: "Clientes", icon: "people-outline" },
    { key: "Contato", label: "Contato", icon: "call-outline" },
];

const DETAIL_PAGES = {
    Inspecoes: { component: InspecoesDetailScreen, title: "Inspeções e Vistorias" },
    Projetos: { component: ProjetosDetailScreen, title: "Projetos" },
    Manutencao: { component: ManutencaoDetailScreen, title: "Manutenção" },
    Treinamentos: { component: TreinamentosDetailScreen, title: "Treinamentos e Gestão" },
};

export default function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [detailPage, setDetailPage] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [servicosOpen, setServicosOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
    const scrollRef = useRef(null);
    const sectionPositions = useRef({});
    const savedScrollY = useRef(0);

    useEffect(() => {
        const init = async () => {
            await initApi();
            const session = await getSession();
            if (session) setAdminUser(session);
        };
        init();
    }, []);

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

    const navigateToDetail = (pageKey) => {
        setDetailPage(pageKey);
    };

    const goBack = () => {
        setDetailPage(null);
        setTimeout(() => {
            scrollRef.current?.scrollTo({
                y: savedScrollY.current,
                animated: false,
            });
        }, 50);
    };

    const handleScroll = (e) => {
        savedScrollY.current = e.nativeEvent.contentOffset.y;
    };

    const handleAdminPress = () => {
        closeDrawer();
        setTimeout(() => {
            if (adminUser) {
                setShowAdmin(true);
            } else {
                setShowLogin(true);
            }
        }, 300);
    };

    const handleLoginSuccess = (user) => {
        setAdminUser(user);
        setShowLogin(false);
        setShowAdmin(true);
    };

    const handleLogout = async () => {
        await logout();
        setAdminUser(null);
        setShowAdmin(false);
    };

    const goBackFromAdmin = () => {
        setShowAdmin(false);
        setShowLogin(false);
    };

    const isMainView = !detailPage && !showLogin && !showAdmin;
    const isDetailView = detailPage && !showLogin && !showAdmin;

    return (
        <View style={s.rootContainer}>
            <SafeAreaView style={s.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={GlobalColors.PRIMARY_DARK}
                />

                {showLogin ? (
                    <View style={s.detailContainer}>
                        <View style={s.detailHeader}>
                            <TouchableOpacity onPress={goBackFromAdmin} style={s.headerSideButton}>
                                <Ionicons name="arrow-back" size={24} color={GlobalColors.WHITE} />
                            </TouchableOpacity>
                            <Text style={s.detailHeaderTitle}>Login</Text>
                            <View style={s.headerSideButton} />
                        </View>
                        <LoginScreen onLoginSuccess={handleLoginSuccess} />
                    </View>
                ) : showAdmin ? (
                    <View style={s.detailContainer}>
                        <View style={s.detailHeader}>
                            <TouchableOpacity onPress={goBackFromAdmin} style={s.headerSideButton}>
                                <Ionicons name="arrow-back" size={24} color={GlobalColors.WHITE} />
                            </TouchableOpacity>
                            <Text style={s.detailHeaderTitle}>Painel Admin</Text>
                            <View style={s.headerSideButton} />
                        </View>
                        <AdminScreen user={adminUser} onLogout={handleLogout} />
                    </View>
                ) : isDetailView ? (
                    <View style={s.detailContainer}>
                        <View style={s.detailHeader}>
                            <TouchableOpacity onPress={goBack} style={s.headerSideButton}>
                                <Ionicons name="arrow-back" size={24} color={GlobalColors.WHITE} />
                            </TouchableOpacity>
                            <Text style={s.detailHeaderTitle} numberOfLines={1}>
                                {DETAIL_PAGES[detailPage].title}
                            </Text>
                            <TouchableOpacity onPress={toggleDrawer} style={s.headerSideButton}>
                                <Ionicons name="menu" size={24} color={GlobalColors.WHITE} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={s.detailScroll}
                            contentContainerStyle={s.detailScrollContent}
                        >
                            <View>
                                {detailPage === "Inspecoes" && <InspecoesDetailScreen />}
                                {detailPage === "Projetos" && <ProjetosDetailScreen />}
                                {detailPage === "Manutencao" && <ManutencaoDetailScreen />}
                                {detailPage === "Treinamentos" && <TreinamentosDetailScreen />}
                            </View>
                            <Footer />
                        </ScrollView>
                    </View>
                ) : (
                    <>
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
                            navigateToDetail={navigateToDetail}
                            onScroll={handleScroll}
                        />
                    </>
                )}
            </SafeAreaView>

            {drawerVisible && (
                <View style={s.drawerContainer}>
                    <TouchableOpacity
                        style={s.overlay}
                        activeOpacity={1}
                        onPress={closeDrawer}
                    />
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
                        {MENU_ITEMS.map((item) =>
                            item.key === "Servicos" ? (
                                <View key={item.key}>
                                    <TouchableOpacity
                                        style={s.drawerItem}
                                        onPress={() => setServicosOpen(!servicosOpen)}
                                    >
                                        <Ionicons name={item.icon} size={20} color={GlobalColors.WHITE} />
                                        <Text style={[s.drawerItemText, { flex: 1 }]}>{item.label}</Text>
                                        <Ionicons
                                            name={servicosOpen ? "chevron-up" : "chevron-down"}
                                            size={16}
                                            color="rgba(255,255,255,0.5)"
                                        />
                                    </TouchableOpacity>
                                    {servicosOpen && (
                                        <View style={s.subMenu}>
                                            {Object.entries(DETAIL_PAGES).map(([key, page]) => (
                                                <TouchableOpacity
                                                    key={key}
                                                    style={s.subMenuItem}
                                                    onPress={() => {
                                                        closeDrawer();
                                                        setServicosOpen(false);
                                                        setTimeout(() => navigateToDetail(key), 300);
                                                    }}
                                                >
                                                    <View style={s.subMenuDot} />
                                                    <Text style={s.subMenuText}>{page.title}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <TouchableOpacity
                                    key={item.key}
                                    style={s.drawerItem}
                                    onPress={() => scrollToSection(item.key)}
                                >
                                    <Ionicons name={item.icon} size={20} color={GlobalColors.WHITE} />
                                    <Text style={s.drawerItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        )}

                        <View style={s.drawerDivider} />

                        <TouchableOpacity style={s.drawerItem} onPress={handleAdminPress}>
                            <Ionicons
                                name={adminUser ? "grid-outline" : "log-in-outline"}
                                size={20}
                                color={GlobalColors.ACCENT}
                            />
                            <Text style={[s.drawerItemText, { color: GlobalColors.ACCENT }]}>
                                {adminUser ? "Painel Admin" : "Login Admin"}
                            </Text>
                        </TouchableOpacity>

                        {adminUser && (
                            <TouchableOpacity
                                style={s.drawerItem}
                                onPress={() => {
                                    closeDrawer();
                                    setTimeout(() => handleLogout(), 300);
                                }}
                            >
                                <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                                <Text style={[s.drawerItemText, { color: "#FF6B6B" }]}>
                                    Sair
                                </Text>
                            </TouchableOpacity>
                        )}
                    </Animated.View>
                </View>
            )}
        </View>
    );
}

const s = StyleSheet.create({
    rootContainer: {
        flex: 1,
        overflow: "hidden",
    },
    drawerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
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
    detailContainer: {
        flex: 1,
        backgroundColor: GlobalColors.BACKGROUND,
    },
    detailHeader: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: GlobalColors.PRIMARY_DARK,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    headerSideButton: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    detailHeaderTitle: {
        flex: 1,
        fontSize: 17,
        fontWeight: "bold",
        color: GlobalColors.WHITE,
        textAlign: "center",
    },
    detailScroll: {
        flex: 1,
        backgroundColor: GlobalColors.BACKGROUND,
    },
    detailScrollContent: {
        flexGrow: 1,
        justifyContent: "space-between",
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
    drawerDivider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.15)",
        marginHorizontal: 20,
        marginVertical: 10,
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
    subMenu: {
        paddingLeft: 55,
    },
    subMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    subMenuDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.4)",
        marginRight: 10,
    },
    subMenuText: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
    },
});
