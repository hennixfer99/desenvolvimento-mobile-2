import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
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
import { addSubmission } from "../../services/fakeApi";

const maskPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const maskCpfCnpj = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 11) {
        return digits
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return digits
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};

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
    const [errors, setErrors] = useState({});
    const [successName, setSuccessName] = useState("");

    const validateField = (field) => {
        setErrors((prev) => {
            const e = { ...prev };
            switch (field) {
                case "nome":
                    if (!nome.trim() || nome.trim().length < 3)
                        e.nome = "Preencha seu nome (mínimo 3 caracteres)";
                    else delete e.nome;
                    break;
                case "email":
                    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                        e.email = "Preencha um e-mail válido";
                    else delete e.email;
                    break;
                case "telefone":
                    if (!telefone || telefone.replace(/\D/g, "").length < 10)
                        e.telefone = "Preencha o telefone completo";
                    else delete e.telefone;
                    break;
                case "empresa":
                    if (!empresa.trim())
                        e.empresa = "Preencha o nome da empresa";
                    else delete e.empresa;
                    break;
                case "servico":
                    if (servicoIndex === 0)
                        e.servico = "Selecione o tipo de serviço";
                    else delete e.servico;
                    break;
                case "mensagem":
                    if (!mensagem.trim())
                        e.mensagem = "Preencha a mensagem";
                    else delete e.mensagem;
                    break;
            }
            return e;
        });
    };

    const validate = () => {
        const e = {};
        if (!nome.trim() || nome.trim().length < 3)
            e.nome = "Preencha seu nome (mínimo 3 caracteres)";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
            e.email = "Preencha um e-mail válido";
        if (!telefone || telefone.replace(/\D/g, "").length < 10)
            e.telefone = "Preencha o telefone completo";
        if (!empresa.trim())
            e.empresa = "Preencha o nome da empresa";
        if (servicoIndex === 0)
            e.servico = "Selecione o tipo de serviço";
        if (!mensagem.trim())
            e.mensagem = "Preencha a mensagem";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

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

                    <Text style={s.inputLabel}>Nome <Text style={s.required}>*</Text></Text>
                    <TextInput
                        style={[s.textInput, errors.nome && s.inputError]}
                        value={nome}
                        onChangeText={(v) => { setNome(v.replace(/[^a-zA-ZÀ-ÿ\s]/g, "")); if (errors.nome) setErrors((p) => ({ ...p, nome: undefined })); }}
                        onBlur={() => validateField("nome")}
                        placeholder="Seu nome"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        maxLength={80}
                    />
                    {errors.nome && <Text style={s.errorText}>{errors.nome}</Text>}

                    <Text style={s.inputLabel}>E-mail <Text style={s.required}>*</Text></Text>
                    <TextInput
                        style={[s.textInput, errors.email && s.inputError]}
                        value={email}
                        onChangeText={(v) => { setEmail(v.replace(/\s/g, "").toLowerCase()); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                        onBlur={() => validateField("email")}
                        placeholder="seu@email.com"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        maxLength={100}
                    />
                    {errors.email && <Text style={s.errorText}>{errors.email}</Text>}

                    <Text style={s.inputLabel}>Telefone <Text style={s.required}>*</Text></Text>
                    <TextInput
                        style={[s.textInput, errors.telefone && s.inputError]}
                        value={telefone}
                        onChangeText={(v) => { setTelefone(maskPhone(v)); if (errors.telefone) setErrors((p) => ({ ...p, telefone: undefined })); }}
                        onBlur={() => validateField("telefone")}
                        placeholder="(00) 00000-0000"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        keyboardType="phone-pad"
                        maxLength={15}
                    />
                    {errors.telefone && <Text style={s.errorText}>{errors.telefone}</Text>}

                    <Text style={s.inputLabel}>Empresa <Text style={s.required}>*</Text></Text>
                    <TextInput
                        style={[s.textInput, errors.empresa && s.inputError]}
                        value={empresa}
                        onChangeText={(v) => { setEmpresa(v); if (errors.empresa) setErrors((p) => ({ ...p, empresa: undefined })); }}
                        onBlur={() => validateField("empresa")}
                        placeholder="Nome da empresa"
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                    />
                    {errors.empresa && <Text style={s.errorText}>{errors.empresa}</Text>}

                    <Text style={s.inputLabel}>Tipo de Serviço <Text style={s.required}>*</Text></Text>
                    <View style={s.selectWrapper}>
                        <TouchableOpacity
                            style={[
                                s.selectButton,
                                selectOpen && s.selectButtonOpen,
                                errors.servico && s.inputError,
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
                                            if (errors.servico) setErrors((p) => ({ ...p, servico: undefined }));
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
                    {errors.servico && <Text style={s.errorText}>{errors.servico}</Text>}

                    <Text style={s.inputLabel}>
                        Nível de Urgência: {urgencia} <Text style={s.required}>*</Text>
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

                    <Text style={s.inputLabel}>Mensagem <Text style={s.required}>*</Text></Text>
                    <TextInput
                        style={[s.textArea, errors.mensagem && s.inputError]}
                        value={mensagem}
                        onChangeText={(v) => { setMensagem(v); if (errors.mensagem) setErrors((p) => ({ ...p, mensagem: undefined })); }}
                        onBlur={() => validateField("mensagem")}
                        placeholder="Descreva sua necessidade..."
                        placeholderTextColor={GlobalColors.TEXT_LIGHT}
                        multiline
                        numberOfLines={4}
                    />
                    {errors.mensagem && <Text style={s.errorText}>{errors.mensagem}</Text>}

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

                    <TouchableOpacity
                        style={s.submitButton}
                        onPress={async () => {
                            if (!validate()) return;
                            try {
                                await addSubmission({
                                    nome: nome.trim(),
                                    email: email.trim(),
                                    telefone: telefone.trim(),
                                    empresa: empresa.trim(),
                                    servico: servicoIndex > 0 ? SERVICE_OPTIONS[servicoIndex] : "",
                                    urgencia,
                                    mensagem: mensagem.trim(),
                                    receberNovidades,
                                });
                                const nomeEnviado = nome.trim().split(" ")[0];
                                setSuccessName(nomeEnviado);
                                setNome("");
                                setEmail("");
                                setTelefone("");
                                setEmpresa("");
                                setMensagem("");
                                setServicoIndex(0);
                                setUrgencia(3);
                                setReceberNovidades(false);
                                setErrors({});
                            } catch (err) {
                                console.warn("Erro ao enviar:", err);
                            }
                        }}
                    >
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

            <Modal visible={successName !== ""} transparent animationType="fade">
                <View style={s.modalOverlay}>
                    <View style={s.modalCard}>
                        <View style={s.modalIconCircle}>
                            <Ionicons name="checkmark-circle" size={50} color={GlobalColors.PRIMARY} />
                        </View>
                        <Text style={s.modalTitle}>Obrigado, {successName}!</Text>
                        <Text style={s.modalText}>
                            Agradecemos pela sua solicitação, entraremos em contato em breve.
                        </Text>
                        <TouchableOpacity
                            style={s.modalButton}
                            onPress={() => setSuccessName("")}
                        >
                            <Text style={s.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    required: {
        color: "#D32F2F",
        fontWeight: "bold",
    },
    inputError: {
        borderColor: "#D32F2F",
        borderWidth: 1.5,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 12,
        marginTop: -12,
        marginBottom: 12,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    modalCard: {
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 16,
        padding: 30,
        alignItems: "center",
        width: "100%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    modalIconCircle: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY_DARK,
        marginBottom: 8,
        textAlign: "center",
    },
    modalText: {
        fontSize: 14,
        color: GlobalColors.TEXT_MEDIUM,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    modalButton: {
        backgroundColor: GlobalColors.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    modalButtonText: {
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
