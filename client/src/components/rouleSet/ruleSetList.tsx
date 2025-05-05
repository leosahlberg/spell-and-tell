import { Box, List, ListItem, Typography, Modal, Tooltip } from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import Button from "../buttons/Button";
import { useState } from "react";
import styles from "./ruleSet.module.scss";
import { RuleSet } from "../../utils/types";
import RuleSetModal from "./ruleSetDialog";
import { useTranslation } from "react-i18next";

type RuleSetListProps = {
  ruleSet: RuleSet;
  edit: boolean;
};
const RuleSetList = (props: RuleSetListProps) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 300 },
        marginRight: { md: 4 },
        border: "2px solid  rgb(212, 202, 187)",
        color: "rgb(12, 23, 79)",
        padding: 4,
        borderRadius: 8,
        boxShadow: 2,
        marginBottom: { xs: 2, md: 24},
      }}
    >
      <Typography
        variant="h1"
        sx={{ marginBottom: 3, paddingLeft: 3, fontSize: 30 }}
      >
   {t("rules.title")}
      </Typography>

      <List sx={{ padding: 0 }}>
        <ListItem className={styles.list}>
          <Box
            tabIndex={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {" "}
            <Tooltip title="Antal ord per bidrag.">
              <Typography className={styles.title}>
                {t("rules.wordCount")}: {props.ruleSet.maxNumberOfWordsPerContribution}
              </Typography>
            </Tooltip>
            <Box sx={{ color: "rgb(12, 23, 79)" }}>
              {<SixtyFpsSelectIcon />}
            </Box>
          </Box>
        </ListItem>
        <ListItem className={styles.list}>
          <Box
            tabIndex={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Tooltip title="Max tid gäller per bidrag.">
              <Typography className={styles.title}>
                {("rules.maxTime")}: {props.ruleSet.maxTime}min
              </Typography>
            </Tooltip>
            <Box sx={{ color: "rgb(12, 23, 79)" }}>
              <HourglassTopTwoToneIcon />
            </Box>
          </Box>
        </ListItem>
        <ListItem className={styles.list}>
          <Box
            tabIndex={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Tooltip title="Antal bidrag för denna berättelse.">
              <Typography className={styles.title}>
              {t("rules.contributions")}: {props.ruleSet.numberOfContribution}
              </Typography>
            </Tooltip>
            <Box sx={{ color: "rgb(12, 23, 79)" }}>
              <PeopleTwoToneIcon />
            </Box>
          </Box>
        </ListItem>
        <ListItem className={styles.list}>
          <Box
            tabIndex={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography className={styles.title}>
            {t("rules.spellCheck")}: {props.ruleSet.spellChecking ? t("rules.yes") : t("rules.no")}
            </Typography>
            <Box sx={{ color: "rgb(12, 23, 79)" }}>
              <ScoreboardTwoToneIcon />
            </Box>
          </Box>
        </ListItem>
        <ListItem className={styles.list}>
          <Box
            tabIndex={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography className={styles.title}>
            {t("rules.spellCheck")}: {props.ruleSet.spellChecking ? "Ja" : "Nej"}
            </Typography>
            <Box sx={{ color: "rgb(12, 23, 79)" }}>
              <SpellcheckTwoToneIcon />
            </Box>
          </Box>
        </ListItem>
      </List>
      {props.edit ? (
        <>
          <Button
            className={styles.button}
            text={t("rules.editRules")}
            onClick={() => setOpenModal(true)}
          />
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <RuleSetModal close={() => setOpenModal(false)}></RuleSetModal>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default RuleSetList;
