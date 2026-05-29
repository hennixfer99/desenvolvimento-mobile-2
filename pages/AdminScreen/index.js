import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { GlobalColors } from "../../constants/colors";
import {
    deleteSubmission,
    getSubmissions,
    updateSubmission,
} from "../../services/fakeApi";

const STATUS_COLORS = {
    pendente: "#FF9800",
    "em andamento": "#2196F3",
    concluido: GlobalColors.PRIMARY,
};

const STATUS_OPTIONS = ["pendente", "em andamento", "concluido"];

export default function AdminScreen({ user, onLogout }) {
    const [submissions, setSubmissions] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [editMensagem, setEditMensagem] = useState("");
    const [editStatus, setEditStatus] = useState("pendente");
    const [expandedId, setExpandedId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadSubmissions = async () => {
        const data = await getSubmissions();
        setSubmissions(data);
    };

    useEffect(() => {
        loadSubmissions();
    }, []);

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        await deleteSubmission(deleteTarget.id);
        setDeleteTarget(null);
        loadSubmissions();
    };

    const openEdit = (item) => {
        setEditItem(item);
        setEditMensagem(item.mensagem || "");
        setEditStatus(item.status || "pendente");
    };

    const handleSaveEdit = async () => {
        if (!editItem) return;
        await updateSubmission(editItem.id, {
            mensagem: editMensagem,
            status: editStatus,
        });
        setEditItem(null);
        loadSubmissions();
    };

    const formatDate = (iso) => {
        if (!iso) return "-";
        const d = new Date(iso);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${d.getFullYear()} ${d
            .getHours()
            .toString()
            .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    };

    const renderItem = ({ item }) => {
        const isExpanded = expandedId === item.id;
        const statusColor = STATUS_COLORS[item.status] || GlobalColors.TEXT_LIGHT;

        return (
            <TouchableOpacity
                style={s.card}
                activeOpacity={0.8}
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
            >
                <View style={[s.statusBar, { backgroundColor: statusColor }]} />
                <View style={s.cardContent}>
                    <View style={s.cardHeader}>
                        <View style={s.cardHeaderLeft}>
                            <Text style={s.cardName}>{item.nome || "Sem nome"}</Text>
                            <Text style={s.cardDate}>{formatDate(item.createdAt)}</Text>
                        </View>
                        <View style={[s.statusBadge, { backgroundColor: statusColor + "20" }]}>
                            <Text style={[s.statusText, { color: statusColor }]}>
                                {item.status || "pendente"}
                            </Text>
                        </View>
                    </View>

                    <View style={s.cardInfoRow}>
                        <Ionicons name="construct-outline" size={13} color={GlobalColors.TEXT_LIGHT} />
                        <Text style={s.cardInfoText}>{item.servico || "-"}</Text>
                    </View>
                    <View style={s.cardInfoRow}>
                        <Ionicons name="mail-outline" size={13} color={GlobalColors.TEXT_LIGHT} />
                        <Text style={s.cardInfoText}>{item.email || "-"}</Text>
                    </View>

                    {isExpanded && (
                        <View style={s.expandedSection}>
                            <View style={s.cardInfoRow}>
                                <Ionicons name="call-outline" size={13} color={GlobalColors.TEXT_LIGHT} />
                                <Text style={s.cardInfoText}>{item.telefone || "-"}</Text>
                            </View>
                            <View style={s.cardInfoRow}>
                                <Ionicons name="business-outline" size={13} color={GlobalColors.TEXT_LIGHT} />
                                <Text style={s.cardInfoText}>{item.empresa || "-"}</Text>
                            </View>
                            {item.urgencia && (
                                <View style={s.cardInfoRow}>
                                    <Ionicons name="alert-circle-outline" size={13} color={GlobalColors.TEXT_LIGHT} />
                                    <Text style={s.cardInfoText}>
                                        Urgência: {item.urgencia}/5
                                    </Text>
                                </View>
                            )}
                            {item.mensagem ? (
                                <View style={s.messageBox}>
                                    <Text style={s.messageLabel}>Mensagem:</Text>
                                    <Text style={s.messageText}>{item.mensagem}</Text>
                                </View>
                            ) : null}

                            <View style={s.actionRow}>
                                <TouchableOpacity
                                    style={s.editButton}
                                    onPress={() => openEdit(item)}
                                >
                                    <Ionicons name="create-outline" size={16} color={GlobalColors.WHITE} />
                                    <Text style={s.editButtonText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={s.deleteButton}
                                    onPress={() => setDeleteTarget({ id: item.id, nome: item.nome })}
                                >
                                    <Ionicons name="trash-outline" size={16} color={GlobalColors.WHITE} />
                                    <Text style={s.deleteButtonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={s.expandHint}>
                        <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={16}
                            color={GlobalColors.TEXT_LIGHT}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmpty = () => (
        <View style={s.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color={GlobalColors.BORDER} />
            <Text style={s.emptyTitle}>Nenhuma solicitação</Text>
            <Text style={s.emptyText}>
                As solicitações enviadas pelo formulário de contato aparecerão aqui.
            </Text>
        </View>
    );

    return (
        <View style={s.container}>
            <View style={s.topBar}>
                <View style={s.topBarLeft}>
                    <Ionicons name="person-circle" size={20} color={GlobalColors.PRIMARY} />
                    <Text style={s.topBarUser}>{user?.username}</Text>
                </View>
                <TouchableOpacity style={s.logoutButton} onPress={onLogout}>
                    <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
                    <Text style={s.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <View style={s.statsRow}>
                <View style={s.statBox}>
                    <Text style={s.statNumber}>{submissions.length}</Text>
                    <Text style={s.statLabel}>Total</Text>
                </View>
                <View style={s.statBox}>
                    <Text style={[s.statNumber, { color: "#FF9800" }]}>
                        {submissions.filter((s) => s.status === "pendente").length}
                    </Text>
                    <Text style={s.statLabel}>Pendentes</Text>
                </View>
                <View style={s.statBox}>
                    <Text style={[s.statNumber, { color: "#2196F3" }]}>
                        {submissions.filter((s) => s.status === "em andamento").length}
                    </Text>
                    <Text style={s.statLabel}>Em andamento</Text>
                </View>
                <View style={s.statBox}>
                    <Text style={[s.statNumber, { color: GlobalColors.PRIMARY }]}>
                        {submissions.filter((s) => s.status === "concluido").length}
                    </Text>
                    <Text style={s.statLabel}>Concluídos</Text>
                </View>
            </View>

            <FlatList
                data={submissions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={submissions.length === 0 ? s.emptyList : s.list}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={editItem !== null} transparent animationType="slide">
                <View style={s.modalOverlay}>
                    <ScrollView contentContainerStyle={s.modalScrollContent}>
                        <View style={s.modalCard}>
                            <View style={s.modalHeader}>
                                <Text style={s.modalTitle}>Editar Solicitação</Text>
                                <TouchableOpacity onPress={() => setEditItem(null)}>
                                    <Ionicons name="close" size={24} color={GlobalColors.TEXT_MEDIUM} />
                                </TouchableOpacity>
                            </View>

                            <Text style={s.modalLabel}>Nome</Text>
                            <View style={s.readOnlyField}>
                                <Text style={s.readOnlyText}>{editItem?.nome || "-"}</Text>
                            </View>

                            <Text style={s.modalLabel}>E-mail</Text>
                            <View style={s.readOnlyField}>
                                <Text style={s.readOnlyText}>{editItem?.email || "-"}</Text>
                            </View>

                            <Text style={s.modalLabel}>Telefone</Text>
                            <View style={s.readOnlyField}>
                                <Text style={s.readOnlyText}>{editItem?.telefone || "-"}</Text>
                            </View>

                            <Text style={s.modalLabel}>Empresa</Text>
                            <View style={s.readOnlyField}>
                                <Text style={s.readOnlyText}>{editItem?.empresa || "-"}</Text>
                            </View>

                            <Text style={s.modalLabel}>Serviço</Text>
                            <View style={s.readOnlyField}>
                                <Text style={s.readOnlyText}>{editItem?.servico || "-"}</Text>
                            </View>

                            <Text style={s.modalLabel}>Status</Text>
                            <View style={s.statusRow}>
                                {STATUS_OPTIONS.map((opt) => (
                                    <TouchableOpacity
                                        key={opt}
                                        style={[
                                            s.statusOption,
                                            editStatus === opt && {
                                                backgroundColor: (STATUS_COLORS[opt] || GlobalColors.PRIMARY) + "20",
                                                borderColor: STATUS_COLORS[opt] || GlobalColors.PRIMARY,
                                            },
                                        ]}
                                        onPress={() => setEditStatus(opt)}
                                    >
                                        <Text
                                            style={[
                                                s.statusOptionText,
                                                editStatus === opt && {
                                                    color: STATUS_COLORS[opt] || GlobalColors.PRIMARY,
                                                    fontWeight: "bold",
                                                },
                                            ]}
                                        >
                                            {opt}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={s.modalLabel}>Mensagem</Text>
                            <TextInput
                                style={[s.modalInput, s.modalTextArea]}
                                value={editMensagem}
                                onChangeText={setEditMensagem}
                                multiline
                                numberOfLines={3}
                            />

                            <TouchableOpacity style={s.saveButton} onPress={handleSaveEdit}>
                                <Text style={s.saveButtonText}>Salvar Alterações</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <Modal visible={deleteTarget !== null} transparent animationType="fade">
                <View style={s.confirmOverlay}>
                    <View style={s.confirmCard}>
                        <View style={s.confirmIconCircle}>
                            <Ionicons name="warning" size={36} color="#D32F2F" />
                        </View>
                        <Text style={s.confirmTitle}>Confirmar exclusão</Text>
                        <Text style={s.confirmText}>
                            Tem certeza que gostaria de excluir a solicitação de "{deleteTarget?.nome}"?
                        </Text>
                        <View style={s.confirmButtons}>
                            <TouchableOpacity
                                style={s.confirmCancelBtn}
                                onPress={() => setDeleteTarget(null)}
                            >
                                <Text style={s.confirmCancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={s.confirmDeleteBtn}
                                onPress={confirmDelete}
                            >
                                <Ionicons name="trash-outline" size={16} color={GlobalColors.WHITE} />
                                <Text style={s.confirmDeleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalColors.BACKGROUND,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: GlobalColors.WHITE,
        borderBottomWidth: 1,
        borderBottomColor: GlobalColors.BORDER,
    },
    topBarLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    topBarUser: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
        marginLeft: 8,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoutText: {
        fontSize: 13,
        color: "#D32F2F",
        marginLeft: 4,
        fontWeight: "bold",
    },
    statsRow: {
        flexDirection: "row",
        padding: 12,
        gap: 8,
    },
    statBox: {
        flex: 1,
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
    },
    statLabel: {
        fontSize: 10,
        color: GlobalColors.TEXT_LIGHT,
        marginTop: 2,
        textTransform: "uppercase",
    },
    list: {
        padding: 12,
        paddingTop: 4,
    },
    emptyList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    card: {
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    statusBar: {
        width: 4,
    },
    cardContent: {
        flex: 1,
        padding: 14,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    cardHeaderLeft: {
        flex: 1,
        marginRight: 10,
    },
    cardName: {
        fontSize: 15,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
    },
    cardDate: {
        fontSize: 11,
        color: GlobalColors.TEXT_LIGHT,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    cardInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    cardInfoText: {
        fontSize: 13,
        color: GlobalColors.TEXT_MEDIUM,
        marginLeft: 8,
    },
    expandedSection: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: GlobalColors.BORDER,
    },
    messageBox: {
        marginTop: 8,
        backgroundColor: GlobalColors.BACKGROUND,
        padding: 10,
        borderRadius: 8,
    },
    messageLabel: {
        fontSize: 11,
        fontWeight: "bold",
        color: GlobalColors.TEXT_LIGHT,
        textTransform: "uppercase",
        marginBottom: 4,
    },
    messageText: {
        fontSize: 13,
        color: GlobalColors.TEXT_DARK,
        lineHeight: 19,
    },
    actionRow: {
        flexDirection: "row",
        marginTop: 14,
        gap: 10,
    },
    editButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2196F3",
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    editButtonText: {
        color: GlobalColors.WHITE,
        fontSize: 13,
        fontWeight: "bold",
    },
    deleteButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D32F2F",
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    deleteButtonText: {
        color: GlobalColors.WHITE,
        fontSize: 13,
        fontWeight: "bold",
    },
    expandHint: {
        alignItems: "center",
        marginTop: 4,
    },
    emptyContainer: {
        alignItems: "center",
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.TEXT_MEDIUM,
        marginTop: 16,
    },
    emptyText: {
        fontSize: 13,
        color: GlobalColors.TEXT_LIGHT,
        textAlign: "center",
        marginTop: 8,
        lineHeight: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    modalScrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    modalCard: {
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 12,
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.PRIMARY_DARK,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: GlobalColors.TEXT_MEDIUM,
        marginBottom: 4,
        marginTop: 10,
    },
    readOnlyField: {
        backgroundColor: GlobalColors.BACKGROUND,
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 6,
        padding: 10,
    },
    readOnlyText: {
        fontSize: 14,
        color: GlobalColors.TEXT_LIGHT,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        color: GlobalColors.TEXT_DARK,
    },
    modalTextArea: {
        height: 70,
        textAlignVertical: "top",
    },
    statusRow: {
        flexDirection: "row",
        gap: 8,
    },
    statusOption: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
    },
    statusOptionText: {
        fontSize: 11,
        color: GlobalColors.TEXT_MEDIUM,
        textTransform: "capitalize",
    },
    saveButton: {
        backgroundColor: GlobalColors.PRIMARY,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: GlobalColors.WHITE,
        fontSize: 15,
        fontWeight: "bold",
    },

    confirmOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    confirmCard: {
        backgroundColor: GlobalColors.WHITE,
        borderRadius: 16,
        padding: 28,
        alignItems: "center",
        width: "100%",
    },
    confirmIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#FFEBEE",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalColors.TEXT_DARK,
        marginBottom: 8,
    },
    confirmText: {
        fontSize: 14,
        color: GlobalColors.TEXT_MEDIUM,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    confirmButtons: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    confirmCancelBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: GlobalColors.BORDER,
    },
    confirmCancelText: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.TEXT_MEDIUM,
    },
    confirmDeleteBtn: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D32F2F",
        gap: 6,
    },
    confirmDeleteText: {
        fontSize: 14,
        fontWeight: "bold",
        color: GlobalColors.WHITE,
    },
});

