module.exports = {
    dependencies: {
        'react-native-material-ui': {
            platforms: {
                ios: null, // disable Android platform, other platforms will still autolink if provided
            },
        },
        'rongcloud-react-native-imlib': {
            platforms: {
                android: null,
                ios: null,
            },
        },
    },
};
