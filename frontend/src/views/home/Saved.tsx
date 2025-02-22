import { ScansGrid } from "../../components/ScansGrid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArray } from "../../utils/storage";
import consts from "../../utils/consts";
import { useTranslation } from "react-i18next";

export const Saved = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [saved, setSaved] = useState<string[]>([]);

    useEffect(() => {
        setSaved(getArray(consts.MANGA_SAVED_KEY));
    }, []);

    const goToManga = (name: string) => {
        navigate(`/manga/${name}/chapter`);
    };

    return (
        <ScansGrid items={saved} action={goToManga} fallbackText={t('saved.empty')} />
    );
}
