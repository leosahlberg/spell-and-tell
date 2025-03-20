import { Box, List, ListItem, Typography, Modal } from "@mui/material";
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

type RuleSetListProps = {
  ruleSet: RuleSet;
  edit: boolean;
};
const RuleSetList = (props: RuleSetListProps) => {
  const [openModal, setOpenModal] = useState(false);

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
        marginBottom: { xs: 2, md: 0 },
      }}
    >
      <Typography variant="h1" sx={{ marginBottom: 3, paddingLeft: 3, fontSize: 30 }}>
        Regler
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
            <Typography className={styles.title}>
              Antal ord: {props.ruleSet.maxNumberOfWordsPerContribution}
            </Typography>
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
            <Typography className={styles.title}>
              Max tid: {props.ruleSet.maxTime}min
            </Typography>
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
            <Typography className={styles.title}>
              Antal deltagare: {props.ruleSet.numberOfContribution}
            </Typography>
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
              Poängräkning: {props.ruleSet.scoring ? "Ja" : "Nej"}
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
              Stavningskontroll: {props.ruleSet.spellChecking ? "Ja" : "Nej"}
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
            text={"Ändra regler"}
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
