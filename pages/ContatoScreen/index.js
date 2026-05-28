import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import ContactInfoItem from "../../components/ContactInfoItem";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import { GlobalColors } from "../../constants/colors";

const SERVICE_OPTIONS = [
    "Selecione o serviço",
    "Inspeções e Vistorias",
    "Projetos",
    "Manutenção",
    "Treinamentos e Gestão",
];

export default function ContatoScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [servicoIndex, setServicoIndex] = useState(0);
    const [selectOpen, setSelectOpen] = useState(false);
    const [urgencia, setUrgencia] = useState(3);
    const [receberNovidades, setReceberNovidades] = useState(false);

    return (
        <View style={s.container}>
            <View style={s.contentPadding}>
                <SectionTitle
                    text="Entre em Contato Conosco!"
                    style={{ color: GlobalColors.PRIMARY }}
                />
                <View style={s.formContainer}>
                    <Text style={s.formDescription}>
                        Preencha nosso formulário para solicitação de orçamento
                        ou visita técnica
                    </Text>

                    <Text style={s.inputLabel}>Nome</Text>
                    <TextInput
                        style={s.textInput}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Seu nome"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                    />

                    <Text style={s.inputLabel}>E-mail</Text>
                    <TextInput
                        style={s.textInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="seu@email.com"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        keyboardType="email-address"
                    />

                    <Text style={s.inputLabel}>Telefone</Text>
                    <TextInput
                        style={s.textInput}
                        value={telefone}
                        onChangeText={setTelefone}
                        placeholder="(00) 00000-0000"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        keyboardType="phone-pad"
                    />

                    <Text style={s.inputLabel}>Empresa</Text>
                    <TextInput
                        style={s.textInput}
                        value={empresa}
                        onChangeText={setEmpresa}
                        placeholder="Nome da empresa"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                    />

                    <Text style={s.inputLabel}>Tipo de Serviço</Text>
                    <View style={s.selectWrapper}>
                        <TouchableOpacity
                            style={[
                                s.selectButton,
                                selectOpen && s.selectButtonOpen,
                            ]}
                            onPress={() => setSelectOpen(!selectOpen)}
                        >
                            <Text
                                style={[
                                    s.selectButtonText,
                                    servicoIndex === 0 && s.selectPlaceholder,
                                ]}
                            >
                                {SERVICE_OPTIONS[servicoIndex]}
                            </Text>
                            <Ionicons
                                name={
                                    selectOpen ? "chevron-up" : "chevron-down"
                                }
                                size={20}
                                color={GlobalColors.TEXT_MEDIUM}
                            />
                        </TouchableOpacity>
                        {selectOpen && (
                            <View style={s.dropdown}>
                                {SERVICE_OPTIONS.slice(1).map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            s.dropdownOption,
                                            servicoIndex === index + 1 &&
                                                s.dropdownOptionActive,
                                        ]}
                                        onPress={() => {
                                            setServicoIndex(index + 1);
                                            setSelectOpen(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                s.dropdownOptionText,
                                                servicoIndex === index + 1 &&
                                                    s.dropdownOptionTextActive,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                        {servicoIndex === index + 1 && (
                                            <Ionicons
                                                name="checkmark"
                                                size={18}
                                                color={GlobalColors.PRIMARY}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <Text style={s.inputLabel}>
                        Nível de Urgência: {urgencia}
                    </Text>
                    <View style={s.urgencyRow}>
                        {[1, 2, 3, 4, 5].map((level) => (
                            <TouchableOpacity
                                key={level}
                                onPress={() => setUrgencia(level)}
                                style={[
                                    s.urgencyButton,
                                    {
                                        backgroundColor:
                                            level <= urgencia
                                                ? GlobalColors.PRIMARY
                                                : GlobalColors.BORDER,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        s.urgencyText,
                                        {
                                            color:
                                                level <= urgencia
                                                    ? GlobalColors.WHITE
                                                    : GlobalColors.TEXT_LIGHT,
                                        },
                                    ]}
                                >
                                    {level}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={s.inputLabel}>Mensagem</Text>
                    <TextInput
                        style={s.textArea}
                        value={mensagem}
                        onChangeText={setMensagem}
                        placeholder="Descreva sua necessidade..."
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        multiline
                        numberOfLines={4}
                    />

                    <View style={s.switchContainer}>
                        <Text style={s.switchLabel}>
                            Aceito receber novidades por e-mail
                        </Text>
                        <Switch
                            value={receberNovidades}
                            onValueChange={setReceberNovidades}
                            trackColor={{
                                false: GlobalColors.BORDER,
                                true: GlobalColors.PRIMARY_LIGHT,
                            }}
                            thumbColor={
                                receberNovidades
                                    ? GlobalColors.PRIMARY
                                    : GlobalColors.TEXT_LIGHT
                            }
                        />
                    </View>

                    <TouchableOpacity style={s.submitButton}>
                        <Text style={s.submitButtonText}>Enviar Mensagem</Text>
                    </TouchableOpacity>
                </View>

                <View style={s.locationSection}>
                    <Text style={s.locationTitle}>
                        Estamos aqui em Praia Grande/SP!
                    </Text>
                    <ContactInfoItem
                        icon="location"
                        label="Endereço:"
                        value={
                            "Avenida Brasil, 600, 4° Andar, Sala 403\nBeatrix Boulevard - Boqueirão\nPraia Grande/SP"
                        }
                    />
                    <ContactInfoItem
                        icon="call"
                        label="Telefone / WhatsApp:"
                        value="(13) 99803-5580"
                    />
                    <ContactInfoItem
                        icon="mail"
                        label="E-mail:"
                        value="contato@imperial-engenharia.com"
                    />
                    <ContactInfoItem
                        icon="globe"
                        label="Website:"
                        value="www.imperial-engenharia.com"
                    />
                </View>
            </View>
            <Footer />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.WHITE,
    },
    contentPadding: {
        padding: 20,
    },
    formContainer: {
        backgroundColor: GlobalColors.CARD_BG,
        borderRadius: 12,
        padding: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 25,
    },
    formDescription: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
        marginBottom: 18,
    },
    inputLabel: {
        fontSize: 13,
        color: GlobalColors.TEXT_MEDIUM,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
        marginBottom: 15,
    },
    textArea: {
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
        marginBottom: 15,
        height: 100,
        textAlignVertical: "top",
    },
    selectWrapper: {
        marginBottom: 15,
        zIndex: 10,
    },
    selectButton: {
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 6,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: GlobalColors.WHITE,
    },
    selectButtonOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomColor: GlobalColors.PRIMARY,
    },
    selectButtonText: {
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
    },
    selectPlaceholder: {
        color: GlobalColors.TEXT_LIGHT,
    },
    dropdown: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: GlobalColors.BORDER,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        backgroundColor: GlobalColors.WHITE,
    },
    dropdownOption: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: GlobalColors.BORDER,
    },
    dropdownOptionActive: {
        backgroundColor: GlobalColors.PRIMARY_LIGHT,
    },
    dropdownOptionText: {
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
    },
    dropdownOptionTextActive: {
        color: GlobalColors.PRIMARY,
        fontWeight: "bold",
    },
    urgencyRow: {
        flexDirection: "row",
        marginBottom: 15,
    },
    urgencyButton: {
        flex: 1,
        height: 36,
        marginHorizontal: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    urgencyText: {
        fontSize: 13,
        fontWeight: "bold",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 13,
        color: GlobalColors.TEXT_MEDIUM,
        flex: 1,
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: GlobalColors.PRIMARY,
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: "center",
    },
    submitButtonText: {
        color: GlobalColors.WHITE,
        fontSize: 15,
        fontWeight: "bold",
    },
    locationSection: {
        marginTop: 10,
        marginBottom: 10,
    },
    locationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY,
        marginBottom: 15,
    },
});
