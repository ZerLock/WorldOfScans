import consts from "./consts";

export interface Settings {
  displayInstallationPopup: boolean;
}

export const defaultSettings = (): Settings => ({
  displayInstallationPopup: true,
});

export const getSettings = (): Settings => {
  const data = localStorage.getItem(consts.SETTINGS_KEY);
  return data ? (JSON.parse(data) as Settings) : defaultSettings();
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(consts.SETTINGS_KEY, JSON.stringify(settings));
};
