import { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import PrincipleCard from "../../components/PrincipleCard";
import SectionTitle from "../../components/SectionTitle";
import { GlobalColors } from "../../constants/colors";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 50) / 2;

const PRINCIPLES = [
    {
        title: "Missão",
        description:
            "Prestar serviços e consultorias de engenharia a empresas do ramo comercial ou industrial, sempre comprometidos com a qualidade de nossas operações, associada à sustentabilidade do meio ambiente, sempre priorizando a segurança em primeiro lugar.",
    },
    {
        title: "Visão",
        description:
            "Alcançar o reconhecimento à nível nacional no ramo de consultoria e prestação de serviços técnicos em engenharia.",
    },
    {
        title: "Valores",
        description:
            "Atuar comprometidos com a transparência e ética em todos os âmbitos de nossas operações, buscando o desenvolvimento de nossos profissionais, atuando sempre em parceria durante nossos processos internos e na interação com nossos clientes.",
    },
    {
        title: "Compromisso",
        description:
            "Garantir excelência em cada projeto, cumprindo prazos e entregando resultados que superem as expectativas dos nossos clientes.",
    },
];

export default function PrincipiosScreen() {
    const scrollRef = useRef(null);
    const [scrollX, setScrollX] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const handleScroll = (event) => {
        setScrollX(event.nativeEvent.contentOffset.x);
    };

    const handleContentSizeChange = (w) => {
        setContentWidth(w);
    };

    const handleLayout = (event) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    const maxScroll = contentWidth - containerWidth;
    const scrollIndicatorWidth =
        maxScroll > 0 ? (containerWidth / contentWidth) * 100 : 100;
    const scrollIndicatorPosition =
        maxScroll > 0
            ? (scrollX / maxScroll) * (100 - scrollIndicatorWidth)
            : 0;

    return (
        <View style={s.container}>
            <SectionTitle text="Nossos Princípios" />
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={s.scrollContent}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + 12}
            >
                {PRINCIPLES.map((principle, index) => (
                    <View
                        key={index}
                        style={[
                            s.cardWrapper,
                            index === PRINCIPLES.length - 1 && s.lastCard,
                        ]}
                    >
                        <PrincipleCard
                            title={principle.title}
                            description={principle.description}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={s.scrollBarTrack}>
                <View
                    style={[
                        s.scrollBarThumb,
                        {
                            width: `${scrollIndicatorWidth}%`,
                            left: `${scrollIndicatorPosition}%`,
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.BACKGROUND,
        paddingVertical: 25,
    },
    scrollContent: {
        paddingHorizontal: 15,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        marginRight: 12,
    },
    lastCard: {
        marginRight: 15,
    },
    scrollBarTrack: {
        height: 5,
        backgroundColor: GlobalColors.BORDER,
        borderRadius: 3,
        marginTop: 20,
        marginHorizontal: 15,
        position: "relative",
    },
    scrollBarThumb: {
        height: "100%",
        backgroundColor: GlobalColors.PRIMARY,
        borderRadius: 3,
        position: "absolute",
    },
});
