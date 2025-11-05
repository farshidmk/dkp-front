import { Warranty } from "@/types/warranty";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import React from "react";
import { Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

type Props = {
  warranties: Warranty[];
};

const WarrantyGrid = ({ warranties }: Props) => {
  const [rows, setRows] = React.useState(warranties);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef<Warranty>[] = [
    {
      field: "min_price",
      headerName: "حداقل مبلغ (ريال)",
      ...DEFAULT_GRID_OPTIONS,
      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body1">
            {row.min_price.toLocaleString("fa")}
          </Typography>
        </div>
      ),
    },
    {
      field: "max_price",
      headerName: "حداکثر مبلغ (ريال)",

      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body1">
            {row.max_price.toLocaleString("fa")}
          </Typography>
        </div>
      ),
      ...DEFAULT_GRID_OPTIONS,
    },
    {
      field: "is_percentage",
      headerName: "نحوه اعمال",

      renderCell: ({ row }) => (
        <div className="flex items-center h-full">
          <Typography variant="body2" fontWeight={500}>
            {row.is_percentage ? "درصدی" : " غیر درصدی"}
          </Typography>
        </div>
      ),
      ...DEFAULT_GRID_OPTIONS,
    },
    {
      field: "warranty_price",
      headerName: "مبلغ/درصد ",
      ...DEFAULT_GRID_OPTIONS,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-1 h-full">
          <Typography variant="body1">
            {row.warranty_price.toLocaleString("fa")}
          </Typography>
          <Typography variant="body2">
            {row.is_percentage ? "%" : " ريال "}
          </Typography>
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "عملیات",
      type: "actions",
      ...DEFAULT_GRID_OPTIONS,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={"save" + id}
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: "primary.main",
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      rows={warranties || []}
      columns={columns}
      disableRowSelectionOnClick
      autosizeOnMount
      autoPageSize
      pagination={undefined}
      hideFooterPagination
      hideFooter
      localeText={{
        noRowsLabel: "تراکنش در انتظار تایید موجود نیست",
      }}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      // processRowUpdate={processRowUpdate}
      slots={{ toolbar: () => <h1>test</h1> }}
      slotProps={
        {
          //   toolbar: { setRows, setRowModesModel, },
          //   toolbar: { se },
        }
      }
      showToolbar
    />
  );
};

export default WarrantyGrid;

const DEFAULT_GRID_OPTIONS: Partial<GridColDef> = {
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  resizable: false,
  flex: 1,
  editable: true,
};

// function EditToolbar(props: GridSlotProps["toolbar"]) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [
//       ...oldRows,
//       { id, name: "", age: "", role: "", isNew: true },
//     ]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <Toolbar>
//       <Tooltip title="اضافه کردن گارنتی">
//         <ToolbarButton onClick={handleClick}>
//           <AddIcon fontSize="small" />
//         </ToolbarButton>
//       </Tooltip>
//     </Toolbar>
//   );
// }
