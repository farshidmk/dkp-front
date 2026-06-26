import { GridLocaleText } from "@mui/x-data-grid";

export const persianGridLocaleText: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: "داده‌ای برای نمایش وجود ندارد",
  noResultsOverlayLabel: "نتیجه‌ای یافت نشد",

  // Error
  //   errorOverlayDefaultLabel: "خطایی رخ داده است",

  // Density selector toolbar
  toolbarDensity: "تراکم",
  toolbarDensityLabel: "تراکم",
  toolbarDensityCompact: "فشرده",
  toolbarDensityStandard: "استاندارد",
  toolbarDensityComfortable: "راحت",

  // Columns selector toolbar
  toolbarColumns: "ستون‌ها",
  toolbarColumnsLabel: "انتخاب ستون‌ها",

  // Filters toolbar
  toolbarFilters: "فیلترها",
  toolbarFiltersLabel: "نمایش فیلترها",
  toolbarFiltersTooltipHide: "پنهان کردن فیلترها",
  toolbarFiltersTooltipShow: "نمایش فیلترها",
  toolbarFiltersTooltipActive: (count: number) => `${count} فیلتر فعال`,

  // Quick filter
  toolbarQuickFilterPlaceholder: "جستجو...",
  toolbarQuickFilterLabel: "جستجو",
  toolbarQuickFilterDeleteIconLabel: "پاک کردن",

  // Export
  toolbarExport: "خروجی",
  toolbarExportLabel: "خروجی",
  toolbarExportCSV: "دانلود CSV",
  toolbarExportPrint: "چاپ",

  // Columns panel
  //   columnsPanelTextFieldLabel: "جستجوی ستون",
  //   columnsPanelTextFieldPlaceholder: "عنوان ستون",
  //   columnsPanelDragIconLabel: "جابجایی ستون",
  //   columnsPanelShowAllButton: "نمایش همه",
  //   columnsPanelHideAllButton: "پنهان کردن همه",

  // Filter panel
  filterPanelAddFilter: "افزودن فیلتر",
  filterPanelRemoveAll: "حذف همه",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLogicOperator: "عملگر منطقی",
  filterPanelOperator: "عملگر",

  // Filter operators
  filterOperatorContains: "شامل",
  filterOperatorEquals: "برابر",
  filterOperatorStartsWith: "شروع با",
  filterOperatorEndsWith: "پایان با",
  filterOperatorIs: "است",
  filterOperatorNot: "نیست",
  filterOperatorAfter: "بعد از",
  filterOperatorOnOrAfter: "بعد یا برابر",
  filterOperatorBefore: "قبل از",
  filterOperatorOnOrBefore: "قبل یا برابر",
  filterOperatorIsEmpty: "خالی است",
  filterOperatorIsNotEmpty: "خالی نیست",
  filterOperatorIsAnyOf: "یکی از",

  // Column menu
  columnMenuLabel: "منوی ستون",
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuHideColumn: "پنهان کردن",
  columnMenuUnsort: "حذف مرتب‌سازی",
  columnMenuSortAsc: "مرتب‌سازی صعودی",
  columnMenuSortDesc: "مرتب‌سازی نزولی",

  // Column header
  columnHeaderSortIconLabel: "مرتب‌سازی",

  paginationRowsPerPage: "تعداد در هر صفحه:",

  paginationDisplayedRows: ({
    count,
    from,
    to,
  }: {
    from: number;
    to: number;
    count: number;
  }) => {
    return `${from.toLocaleString("fa")}–${to.toLocaleString("fa")} از ${count !== -1 ? count.toLocaleString("fa") : `بیشتر از ${to.toLocaleString("fa")}`}`;
  },
  // Footer
  footerRowSelected: (count: number) => `${count} ردیف انتخاب شده`,

  // Checkbox
  checkboxSelectionHeaderName: "انتخاب",
};
