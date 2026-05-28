# Imperial Engenharia

Aplicativo mobile da Imperial Engenharia construído com [Expo](https://expo.dev) e React Native.

## Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js** (versão 16.0.0 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (normalmente instalado com Node.js)
- **Git** - [Download aqui](https://git-scm.com/)

Para testar em dispositivos móveis, você também precisará:

- **Expo Go** - Aplicativo disponível na [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779) ou [Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## Como Rodar o Projeto

### Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd ImperialEngenharia
```

### Instalar Dependências

```bash
npm install
```

Este comando irá instalar todas as dependências necessárias listadas no `package.json`.

### Iniciar o Servidor de Desenvolvimento

```bash
npx expo start
```

Após executar este comando, você verá no terminal um código QR e várias opções:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
›
› Press s │ switch to development build
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
```

### Escolha Como Rodar

Você tem as seguintes opções:

#### **Opção 1: No seu Smartphone (Recomendado)**

- **Android**: Abra o aplicativo **Expo Go** e escaneie o código QR
- **iOS**: Abra a câmera padrão, aponte para o código QR e clique no aviso do Expo Go

#### **Opção 2: Emulador Android**

Pressione `a` no terminal (requer Android Studio instalado)

```bash
a
```

#### **Opção 3: Simulador iOS**

Pressione `i` no terminal (apenas em macOS com Xcode instalado)

```bash
i
```

#### **Opção 4: Browser Web**

Pressione `w` no terminal

```bash
w
```

---

## 📁 Estrutura do Projeto

```
ImperialEngenharia/
├── assets/              # Imagens e ícones
│   └── images/         # Logo e imagens da aplicação
├── components/         # Componentes reutilizáveis
├── pages/             # Telas da aplicação
├── constants/         # Constantes (cores, etc)
├── routes/            # Configuração de rotas
├── App.js             # Arquivo principal
├── package.json       # Dependências do projeto
└── README.md          # Este arquivo
```

---

## Comandos Disponíveis

- **`npm install`** - Instala as dependências do projeto
- **`npm start`** ou **`npx expo start`** - Inicia o servidor de desenvolvimento
- **`npm run reset-project`** - Reseta o projeto para o estado inicial

---

## Troubleshooting

### Erro: "expo command not found"

Instale o Expo CLI globalmente:

```bash
npm install -g expo-cli
```

### Erro: "Cannot find module"

Limpe o cache e reinstale as dependências:

```bash
npm install --force
```

### Porta 8081 já em uso

Mude a porta usando:

```bash
npx expo start --port 8082
```

### QR Code não funciona

1. Verifique se seu smartphone está na **mesma rede WiFi** do computador
2. Feche o Expo Go completamente e abra novamente
3. Tente reconectar ao servidor

---

## Recursos Úteis

- [Documentação Expo](https://docs.expo.dev/) - Guias e tutoriais
- [React Native Docs](https://reactnative.dev/) - Documentação do React Native
- [Ionicons](https://ionic.io/ionicons) - Ícones utilizados no projeto

---
