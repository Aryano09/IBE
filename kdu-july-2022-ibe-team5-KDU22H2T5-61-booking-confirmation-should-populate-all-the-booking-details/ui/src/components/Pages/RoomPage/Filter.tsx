import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useAppDispatch } from "../../../Redux/hooks";
import { appendRoomTypeToFilter, removeRoomTypeFromFilter } from "../../../Redux/slices/FilterSlices/RoomTypeFilterSlice";
import { appendBedTypeToFilter, removeBedTypeFromFilter } from "../../../Redux/slices/FilterSlices/BedTypeFilterSlice";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const roomOptions = [
  { value: "SUPER_DELUXE", label: "Super Deluxe" },
  { value: "STANDARD_SUITE", label: "Standard Suite" },
  { value: "FAMILY_DELUXE", label: "Family Deluxe" },
  { value: "GARDEN_SUITE", label: "Garden Suite" },
  { value: "COUPLE_SUITE", label: "Couple Suite" },
  { value: "GRAND_DELUXE", label: "Grand Deluxe" },
];

const bedOptions = [
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE", label: "Double" },
];

const Filter = () => {
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [checkedStateRA, setCheckedStateRA] = useState(false);
  const [checkedStateRB, setCheckedStateRB] = useState(false);
  const [checkedStateRC, setCheckedStateRC] = useState(false);
  const [checkedStateRD, setCheckedStateRD] = useState(false);
  const [checkedStateRE, setCheckedStateRE] = useState(false);
  const [checkedStateRF, setCheckedStateRF] = useState(false);

  const dispatch = useAppDispatch();

  const roomOptionCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>, roomType: string) => {
    console.log(`changed checkbox value: `, roomType);
    console.log(`changed checkbox checked: `, e.currentTarget.checked);
    
    if(e.currentTarget.checked){
      dispatch(appendRoomTypeToFilter(roomType));
    }
    else{
      dispatch(removeRoomTypeFromFilter(roomType));
    }
  }

  const bedOptionCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>, bedType: string) => {
    console.log(`changed checkbox value: `, bedType);
    console.log(`changed checkbox checked: `, e.currentTarget.checked);
    
    if(e.currentTarget.checked){
      dispatch(appendBedTypeToFilter(bedType));
    }
    else{
      dispatch(removeBedTypeFromFilter(bedType));
    }
  }

  return (
    <div className="filterContainer">
      <div className="filter-comp shadow-2xl">
        <div className="p-4 text-2xl font-semibold">Narrow your results</div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <span>Room Type</span>
          </AccordionSummary>
          <AccordionDetails>
            {roomOptions.map((option) => {
              return (
                <div className="roomOption">
                  <input type="checkbox" onChange={(e) => roomOptionCheckboxHandler(e, option.value)}/>
                  <label> {option.label}</label>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <span>Bed Type</span>
          </AccordionSummary>
          <AccordionDetails>
          {bedOptions.map((option) => {
              return (
                <div className="roomOption">
                  <input type="checkbox" onChange={(e) => bedOptionCheckboxHandler(e, option.value)}/>
                  <label> {option.label}</label>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
