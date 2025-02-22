import consts from "./consts";

export interface Settings {
  displayInstallationPopup: boolean;
  lang: "en" | "fr";
}

export const defaultSettings = (): Settings => ({
  displayInstallationPopup: true,
  lang: "fr",
});

export const getSettings = (): Settings => {
  const data = localStorage.getItem(consts.SETTINGS_KEY);
  return data ? (JSON.parse(data) as Settings) : defaultSettings();
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(consts.SETTINGS_KEY, JSON.stringify(settings));
};

export const getInterfaceLanguage = (): string => {
  const settings = getSettings();
  return settings.lang || "fr";
};
