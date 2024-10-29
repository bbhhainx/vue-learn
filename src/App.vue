<template>
  <div class="w-screen h-screen overflow-auto">
    <table :style="{ width: table.getCenterTotalSize() + 'px' }">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            class="border border-black relative p-0"
            :class="header.column.columnDef.meta?.header_class"
            :key="header.id"
            :colSpan="header.colSpan"
            :style="{ width: header.getSize() + 'px' }"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            <div
              class="resizer right-0"
              @mousedown="header.getResizeHandler()?.($event)"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td
            v-for="cell in row.getVisibleCells()"
            :class="cell.column.columnDef.meta?.cell_class"
            :style="{ width: cell.column.getSize() + 'px' }"
            class="border border-black p-0 h-6"
            :key="cell.id"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr
          v-for="footerGroup in table.getFooterGroups()"
          :key="footerGroup.id"
        >
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </tfoot>
    </table>
    <div class="h-4" />
    <button @click="rerender" class="border p-2">Rerender</button>
  </div>
</template>

<script setup lang="tsx">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  RowSelectionState,
} from "@tanstack/vue-table";
import { ref, watch } from "vue";
import { defaultData, Person } from "./mockdata";
import { h } from "vue";

const columnHelper = createColumnHelper<Person>();

const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) =>
      h("input", {
        type: "checkbox",
        class:"accent-black",
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler(),
      }),
    cell: ({ row }: { row: any }) =>
      h("input", {
        type: "checkbox",
        class:"accent-black m-auto",
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        onChange: row.getToggleSelectedHandler(),
      }),
      meta: {
        cell_class: "sticky left-0 bg-white !w-10 text-center",
        header_class: "sticky left-0 bg-white z-10 !w-10",
      }
  },
  columnHelper.accessor("id", {
    header: (info) =>
      h("div", { class: "outline-1 outline outline-black" }, "ID"),
    cell: (info) =>
      h(
        "div",
        { class: "outline-1 outline outline-black h-full" },
        info.getValue()
      ),
    meta: {
      cell_class: "sticky left-10 bg-white",
      header_class: "sticky left-10 bg-white z-10",
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("occupation", {
    header: "Occupation",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("isActive", {
    header: "Active",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("joinDate", {
    header: (info) =>
      h("div", { class: "outline-1 outline outline-black" }, "ID"),
    cell: (info) =>
      h(
        "div",
        { class: "outline-1 outline outline-black h-full" },
        info.getValue()
      ),
    meta: {
      cell_class: "sticky right-0 bg-white",
      header_class: "sticky right-0 bg-white z-10",
    },
  }),
];

const data = ref(defaultData);

const rerender = () => {
  data.value = defaultData;
};

const rowSelection = ref<RowSelectionState>({})

watch(() => rowSelection.value, () => {
  console.log(rowSelection.value)
})

const table = useVueTable({
  get data() {
    return data.value;
  },
  state: {
    get rowSelection() {
      return rowSelection.value
    },
  },
  columns,
  enableRowSelection: true,
  columnResizeMode: "onChange",
  columnResizeDirection: "ltr",
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
  onRowSelectionChange: updateOrValue => {
    rowSelection.value =
      typeof updateOrValue === 'function'
        ? updateOrValue(rowSelection.value)
        : updateOrValue
  },
  getCoreRowModel: getCoreRowModel(),
});
</script>

<style>
.resizer {
  position: absolute;
  top: 0;
  height: 100%;
  width: 5px;
  background: rgba(0, 0, 0, 0.5);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  opacity: 0;
}
.resizer:hover {
  opacity: 1;
}
/* @media (hover: hover) {
  .resizer {
    opacity: 0;
  }

  *:hover > .resizer {
    opacity: 1;
  }
} */
</style>
