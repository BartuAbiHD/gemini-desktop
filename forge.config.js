module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'gemini-desktop',
    icon: __dirname + '/images/Gemini'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://raw.githubusercontent.com/BartuAbiHD/gemini-desktop/main/images/Gemini.ico',
        setupIcon: __dirname + './images/Gemini.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './images/Gemini.png'
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: './images/Gemini.png'
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        icon: './images/Gemini.png'
      },
    },
    {
      name: 'electron-forge-maker-appimage',
      platforms: ['linux'],
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'mikepruett3',
          name: 'gemini-desktop'
        }
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
