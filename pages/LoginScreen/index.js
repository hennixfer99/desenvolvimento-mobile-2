import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { GlobalColors } from "../../constants/colors";
import { login } from "../../services/fakeApi";

export default function LoginScreen({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError("Preencha todos os campos");
            return;
        }
        setError("");
        setLoading(true);
        const result = await login(username.trim(), password);
        setLoading(false);
        if (result.success) {
            onLoginSuccess(result.user);
        } else {
            setError(result.error);
        }
    };

    return (
        <View style={s.container}>
            <View style={s.logoSection}>
                <View style={s.iconCircle}>
                    <Ionicons name="shield-checkmark" size={40} color={GlobalColors.PRIMARY} />
                </View>
                <Text style={s.title}>Painel Administrativo</Text>
                <Text style={s.subtitle}>Imperial Engenharia</Text>
            </View>

            <View style={s.formCard}>
                {error !== "" && (
                    <View style={s.errorBox}>
                        <Ionicons name="alert-circle" size={16} color="#D32F2F" />
                        <Text style={s.errorText}>{error}</Text>
                    </View>
                )}

                <Text style={s.label}>Usuário</Text>
                <View style={s.inputWrapper}>
                    <Ionicons
                        name="person-outline"
                        size={18}
                        color={GlobalColors.TEXT_LIGHT}
                        style={s.inputIcon}
                    />
                    <TextInput
                        style={s.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Digite seu usuário"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        autoCapitalize="none"
                    />
                </View>

                <Text style={s.label}>Senha</Text>
                <View style={s.inputWrapper}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={18}
                        color={GlobalColors.TEXT_LIGHT}
                        style={s.inputIcon}
                    />
                    <TextInput
                        style={s.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={GlobalColors.TEXT_LIGHT}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[s.loginButton, loading && s.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={GlobalColors.WHITE} />
                    ) : (
                        <Text style={s.loginButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalColors.BACKGROUND,
        padding: 20,
    },
    logoSection: {
        alignItems: "center",
        marginBottom: 30,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: GlobalColors.PRIMARY_LIGHT,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY_DARK,
    },
    subtitle: {
        fontSize: 14,
        color: GlobalColors.TEXT_MEDIUM,
        marginTop: 4,
    },
    formCard: {
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 12,
        padding: 24,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFEBEE",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 13,
        marginLeft: 8,
        flex: 1,
    },
    label: {
        fontSize: 13,
        fontWeight: "bold",
        color: GlobalColors.TEXT_MEDIUM,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 18,
        backgroundColor: GlobalColors.BACKGROUND,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
    },
    loginButton: {
        backgroundColor: GlobalColors.PRIMARY,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: GlobalColors.WHITE,
        fontSize: 16,
        fontWeight: "bold",
    },
});
