import React from 'react';
import {
StyleSheet,
ScrollView,
SafeAreaView,
Text,
} from 'react-native';

const Title = ({children}) => {
    return (
      <Text style={styles.title}>{children}</Text>
    );
}
const Primary = ({children}) => {
    return (
      <Text style={styles.primary}>{children}</Text>
    );
}
const Secondary = ({children}) => {
    return (
      <Text style={styles.secondary}>{children}</Text>
    );
}

export default class ScreenConditions extends React.Component {
    static navigationOptions = {
        title: 'Conditions d\'utilisation',
        headerShown: true,
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.home}>
                <ScrollView contentContainerStyle={styles.main}>
                    <Title>Définitions</Title>
                    <Secondary>Les présentes Conditions Générales d’Utilisation ont pour objet de définir les modalités de mise à disposition du site chat.arthaud.dev et de l'application "Chat" développée par Arthaud Proust, ci-après nommé « le Service » et les conditions d’utilisation du Service par l’Utilisateur.</Secondary>
                    <Secondary>Le Site désigne le site chat.arthaud.dev.</Secondary>
                    <Secondary>L'Application désigne l'application actuellement utilisée et nommée "Chat".</Secondary>
                    <Secondary>L’Utilisateur est toute personne qui utilise le Site, l'Application ou l’un des services proposés sur le Site.</Secondary>
                    <Secondary>Le Propriétaire des services, de l'Application et du Site est Arthaud Proust</Secondary>
                    <Secondary>Le terme « Contenu Utilisateur » désigne les données transmises par l’Utilisateur dans les différentes rubriques du Site.</Secondary>
                    <Primary>L’utilisation du Site et de l'Application impliquent l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites.</Primary>
                    <Primary>L'Application est une application à but non-lucratif permettant le libre échange entre les Utilisateurs au moyen de salons de discussions. Les Utilisateurs sélectionnent un pseudonyme, qui ne peut attester de leur identité, pour se reconnaître entre eux.</Primary>
                    
                    <Title>Responsabilité</Title>
                    <Primary>Le Propriétaire se décharge de toute responsabilité vis à vis des messages envoyés sur l'Application ou le Site.</Primary>

                    <Title>Données utilisateurs</Title>
                    <Primary>Aucune donnée personnelle n'est enregistrée sur nos serveur.</Primary>
                    <Primary>Les seules données enregistrées sur l'appareil de l'Utilisateur sont le pseudonyme choisit et la liste des salons qu'il a rejoint.</Primary>

                    <Title>Propriété intellectuelle</Title>
                    <Primary>Toute exploitation ou reproduction non autorisée du Site, de l'Application ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</Primary>

                    <Title>Liens externes</Title>
                    <Primary>Le Propriétaire n'a aucune responsabilité sur les éventuels liens partagés via l'Application ou le Site.</Primary>
                    
                    <Title>Force majeure</Title>
                    <Primary>La responsabilité du Site ou de l'Application ne pourra être engagée en cas de force majeure ou de faits indépendants de sa volonté.</Primary>

                    <Title>Mise à jour des conditions</Title>
                    <Primary>Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les Utilisateurs sont donc invités à les consulter de manière régulière.</Primary>

                    <Title>Mentions légales</Title>
                    <Secondary>Statut du propriétaire : particulier. Le Propriétaire est : Arthaud PROUST</Secondary>
                    <Primary>Les seules données enregistrées et les seuls cookies utilisés sont nécessaires au fonctionnement du site.</Primary>
                    <Primary>Aucune information personnelle de l'utilisateur du Site ou de l'Application n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat du Site, de l'Application et de ses droits autorise le Propriétaire à transmettre les dites informations à l'éventuel acquéreur qui serait à son tour tenu à la même obligation de conservation et de modification des données vis à vis de l'Utilisateur.</Primary>
                    <Primary>Le Site et l'Application sont en conformité avec le RGPD. Pour toute réclamation, merci de vous addresser à l'adressse mail contact@arthaud.dev</Primary>

                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column'
    },
    main: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#ffffff"
    },  
    primary: {
        paddingTop: 2,
        paddingBottom: 5,
        fontSize: 13,
        color: "#000"
    },
    secondary: {
        paddingBottom: 5,
        fontSize: 12,
        color: "#777"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 20
    }
});

