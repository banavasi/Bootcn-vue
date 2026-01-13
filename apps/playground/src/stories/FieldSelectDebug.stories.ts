import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "reka-ui";

const meta = {
  title: "Debug/SelectRaw",
  component: SelectRoot,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
];

export const RawSelect: Story = {
  render: () => ({
    components: {
      SelectRoot,
      SelectTrigger,
      SelectValue,
      SelectIcon,
      SelectPortal,
      SelectContent,
      SelectViewport,
      SelectItem,
      SelectItemText,
      SelectItemIndicator,
    },
    setup() {
      const selected = ref(people[0]);
      return { selected, people };
    },
    template: `
      <div class="p-4">
        <h3>Raw Reka UI Select Test</h3>
        <p>Selected: {{ selected?.name || 'None' }}</p>
        
        <SelectRoot v-model="selected" by="id">
          <SelectTrigger class="form-select" style="width: 300px;">
            <SelectValue>
              {{ selected?.name || 'Select...' }}
            </SelectValue>
            <SelectIcon>▼</SelectIcon>
          </SelectTrigger>
          
          <SelectPortal>
            <SelectContent class="dropdown-menu show border shadow" position="popper">
              <SelectViewport class="p-2">
                <SelectItem
                  v-for="person in people"
                  :key="person.id"
                  :value="person"
                  class="dropdown-item cursor-pointer"
                >
                  <SelectItemText>{{ person.name }}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>
    `,
  }),
};

export const WithoutBy: Story = {
  render: () => ({
    components: {
      SelectRoot,
      SelectTrigger,
      SelectValue,
      SelectIcon,
      SelectPortal,
      SelectContent,
      SelectViewport,
      SelectItem,
      SelectItemText,
      SelectItemIndicator,
    },
    setup() {
      const selected = ref(people[0]);
      return { selected, people };
    },
    template: `
      <div class="p-4">
        <h3>Without 'by' prop</h3>
        <p>Selected: {{ selected?.name || 'None' }}</p>
        
        <SelectRoot v-model="selected">
          <SelectTrigger class="form-select" style="width: 300px;">
            <SelectValue>
              {{ selected?.name || 'Select...' }}
            </SelectValue>
            <SelectIcon>▼</SelectIcon>
          </SelectTrigger>
          
          <SelectPortal>
            <SelectContent class="dropdown-menu show border shadow" position="popper">
              <SelectViewport class="p-2">
                <SelectItem
                  v-for="person in people"
                  :key="person.id"
                  :value="person"
                  class="dropdown-item cursor-pointer"
                >
                  <SelectItemText>{{ person.name }}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>
    `,
  }),
};
