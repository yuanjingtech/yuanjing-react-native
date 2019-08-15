module.exports = {
    dependencies: {
        'react-native-material-ui': {
            platforms: {
                ios: null, // disable Android platform, other platforms will still autolink if provided
                android: null,
            },
        },
        'rongcloud-react-native-imlib': {
            platforms: {
                android: null,
                ios: null,
            },
        },
        'react-native-code-push': {
            platforms: {
                android: null,
            },
        },
    },
};
