import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formReducer, initialState } from "../Layout/Reducers/FormReducer";
import { useReducer } from "react";
import { useContext } from "react";
import { GeneralContext, ProjectContext } from "../Layout/App";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

c