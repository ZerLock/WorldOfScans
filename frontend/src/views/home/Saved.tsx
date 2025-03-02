import { ScansGrid } from "../../components/ScansGrid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Data } from "../../utils/data";

export const Saved = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToManga = (name: string) => {
        navigate(`/manga/${name}/chapter`);
    };

    return (
        <ScansGrid items={Data.instance.getSaved()} action={goToManga} fallbackText={t('saved.empty')} />
    );
}
