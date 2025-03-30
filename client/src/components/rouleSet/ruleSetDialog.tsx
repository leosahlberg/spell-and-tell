import { Box, Typography, TextField } from "@mui/material";
import Button from "../buttons/Button";
import { useState } from "react";
import styles from "./ruleSet.module.scss";
import { RuleSet } from "../../utils/types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addCustomRuleSet } from "../../redux/rulesetSlice";

type RuleSetDialogProps = {
  close: () => void;
};

const RuleSetModal = (props: RuleSetDialogProps) => {
  const [ruleSet, setRuleSet] = useState<RuleSet>({
    maxNumberOfWordsPerContribution: 0,
    numberOfContribution: 0,
    maxTime: 0,
    spellChecking: false,
    scoring: false,
    public: true,
  });

  const dispatch = useDispatch<AppDispatch>();

  function saveRuleSet() {
    dispatch(addCustomRuleSet(ruleSet));
    props.close();
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        bgcolor: "background.paper",
        border: "1px solid rgb(195, 158, 121)",
        p: 3,
        borderRadius: 2,
        boxShadow: 24,
      }}
    >
      <Box
        sx={{
          marginBottom: { xs: 2, md: 0 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: 3, fontSize: 30 }}>
          Regler för story
        </Typography>
        <TextField
          id="numberOfWords"
          label="Antal ord"
          value={ruleSet.maxNumberOfWordsPerContribution}
          variant="outlined"
          aria-labelledby="story-numberOfWords-label"
          fullWidth
          onChange={(e) =>
            setRuleSet({
              ...ruleSet,
              maxNumberOfWordsPerContribution: Number(e.currentTarget.value),
            })
          }
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />
        <TextField
          id="numberOfContribution"
          label="Antal bidrag"
          value={ruleSet.numberOfContribution}
          variant="outlined"
          aria-labelledby="story-numberOfContribution-label"
          fullWidth
          onChange={(e) =>
            setRuleSet({
              ...ruleSet,
              numberOfContribution: Number(e.currentTarget.value),
            })
          }
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />
        <TextField
          id="maxTime"
          label="Max tid"
          value={ruleSet.maxTime}
          variant="outlined"
          aria-labelledby="story-maxTime-label"
          fullWidth
          onChange={(e) =>
            setRuleSet({
              ...ruleSet,
              maxTime: Number(e.currentTarget.value),
            })
          }
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />
        <FormControl>
          <FormLabel id="spell-check-label">Stavningskontroll</FormLabel>
          <RadioGroup
            row
            aria-labelledby="spell-check-label"
            name="spell-check"
            onChange={(e) =>
              setRuleSet({
                ...ruleSet,
                spellChecking: e.currentTarget.value === "Yes" ? true : false,
              })
            }
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Ja" />
            <FormControlLabel value="No" control={<Radio />} label="Nej" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="score-label">Poängräkning</FormLabel>
          <RadioGroup
            row
            aria-labelledby="score-label"
            name="score-label"
            onChange={(e) =>
              setRuleSet({
                ...ruleSet,
                scoring: e.currentTarget.value === "Yes" ? true : false,
              })
            }
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Ja" />
            <FormControlLabel value="No" control={<Radio />} label="Nej" />
          </RadioGroup>
        </FormControl>
        <Button
          className={styles.button}
          text={"Spara"}
          onClick={saveRuleSet}
        />
      </Box>
    </Box>
  );
};

export default RuleSetModal;
