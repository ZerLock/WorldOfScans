import consts from "./consts";

export interface Settings {
  displayInstallationPopup: boolean;
  lang: "en" | "fr";
  chaptersDisplay: "list" | "grid";
}

export const defaultSettings = (): Settings => ({
  displayInstallationPopup: true,
  lang: "fr",
  chaptersDisplay: "list",
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

export const getChaptersDisplay = (): string => {
  const settings = getSettings();
  return settings.chaptersDisplay || "list";
};
