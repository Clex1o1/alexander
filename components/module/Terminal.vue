<script lang="ts" setup>
import type { NavItem } from "@nuxt/content/types";
/**
 * A Terminal to navigate through my website
 * Commands to implement:
 * help
 * cd [path]
 * ls
 * contact -> interactive form
 * (eastereggs)
 */

const open = useState("terminal-open", () => false);
const openCommand = useState("terminal-open-command", () => "");
const path = ref("/home");
const lines = ref<Array<string>>([]);
const inputElement = ref<HTMLElement | null>(null);
const terminal = ref<HTMLElement | null>(null);
const terminalElement = ref<HTMLElement | null>(null);
const input = ref("");
const router = useRouter();
const route = useRoute();
const { cmd, ctrl, k, c } = useMagicKeys();
const availableCommands = ["help", "cd", "ls", "clear"];
// const availableCommands = ["help", "cd", "ls", "contact", "clear"];
const currentStep = ref("");
const contactForm = reactive({
  contactstep: 0,
  contactsteps: 5,
  firstname: "",
  lastname: "",
  email: "",
  message: "",
});
onClickOutside(terminalElement, () => {
  if (open.value) open.value = false;
});

watchEffect(() => {
  if ((cmd.value && k.value) || (ctrl.value && k.value)) {
    open.value = !open.value;
  }
});

watchEffect(() => {
  if (ctrl.value && c.value) {
    input.value = "";
    if (contactForm.contactstep > 0) {
      lines.value.push("Contact form canceled");
      contactForm.contactstep = 0;
      currentStep.value = "";
    }
  }
});

// #region init
// set path to current route (path)
path.value = route.fullPath;
// fetch navigation items based on path
const { data: navigation } = await useAsyncData(
  "navigation-terminal",
  () => fetchContentNavigation(),
  { watch: [path] }
);
// map the sites from the navigation items to get the paths and add site without file
const sites = computed(() => {
  // map _path from navigation items and recursively add childrens _path if exists
  if (!navigation.value) return [];

  return mapPaths(navigation.value);
});

function mapPaths(items: NavItem[]): string[] {
  return items.reduce((acc, item) => {
    if (item._path) {
      acc.push(item._path);
    }
    if (item.children) {
      acc.push(...mapPaths(item.children));
    }
    return acc;
  }, [] as string[]);
}
// #endregion

// #region watch init command on terminal open
watch(open, (isOpen) => {
  nextTick(() => {
    if (isOpen) {
      if (lines.value.length === 0) {
        lines.value.push("Welcome to my website terminal!");
        lines.value.push("Type 'help' to get started");
      }
      if (openCommand.value) {
        input.value = openCommand.value;
        openCommand.value = "";
        submit();
        inputElement.value?.focus();
      }
    }
  });
});
// #endregion

// if new line added, scroll to bottom of terminal and remove first line if more than 1000 lines for performance reasons
watch(lines.value, async () => {
  if (terminal.value) {
    // the next tick
    await nextTick(() => {
      terminal.value?.scrollTo({
        top: terminal.value?.scrollHeight,
      });
    });
  }
  if (lines.value.length > 1000) {
    lines.value.shift();
  }
});

function submit() {
  if (contactForm.contactstep > 0) {
    switch (contactForm.contactstep) {
      case 1:
        contactForm.firstname = input.value;
        currentStep.value = "Lastname:";
        lines.value.push("Enter Lastname");
        break;
      case 2:
        contactForm.lastname = input.value;
        currentStep.value = "Email:";
        lines.value.push("Enter Email");
        break;
      case 3:
        contactForm.email = input.value;
        currentStep.value = "Message:";
        lines.value.push("Enter Message");
        break;
      case 4:
        contactForm.message = input.value;
        currentStep.value = "";
        lines.value.push("Contact form submitted!");
        contactForm.contactstep = 0;
        input.value = "";
        return;
      default:
        break;
    }
    contactForm.contactstep++;
    input.value = "";
    return;
  }
  lines.value.push(input.value);
  switch (true) {
    // cd to path based on regex
    case /^cd\s+\/?[\w-]+/.test(input.value):
      const newPath = input.value.split(" ")[1];
      if (
        sites.value?.includes(newPath) ||
        sites.value?.includes("/" + newPath)
      ) {
        path.value = newPath;
        router.push(path.value);
      } else {
        lines.value.push(`cd: no such file or directory: ${newPath}`);
      }
      break;
    // cd to upper directory
    case /^cd\s+\.\./.test(input.value):
      const parentPath = path.value.split("/").slice(0, -1).join("/");
      if (sites.value?.includes(parentPath)) {
        path.value = parentPath;
        router.push(path.value);
      } else if (!parentPath) {
        router.push("/");
      } else {
        lines.value.push(`cd: no such file or directory: ${parentPath}`);
      }
      break;
    // list all sites
    case /^ls/.test(input.value):
      lines.value.push(sites.value?.join(" ") || "");
      break;
    // clear terminal
    case /^clear/.test(input.value):
      lines.value = [];
      break;

    // case contact
    // case /^contact/.test(input.value):
    //   lines.value.push("Starting contact form...");
    //   lines.value.push("Enter Firstname");
    //   currentStep.value = "Firstname:";
    //   contactForm.contactstep = 1;
    //   break;
    // case help
    case /^help/.test(input.value):
      lines.value.push(
        "Available commands:",
        "cd [path] - change directory",
        "ls - list all sites",
        "clear - clear terminal",
        "contact - open interactive contact form"
      );
      break;

    default:
      lines.value.push(`command not found: ${input.value}. Try 'help'`);
  }

  // clear input after successful command
  input.value = "";
}

function autocomplete(event: KeyboardEvent) {
  // try first autocomplete by available inputs commands if no match found try with sites
  const matches = availableCommands.filter((command) =>
    command.includes(input.value)
  );
  if (matches?.length) {
    input.value = matches[0] + " ";
  } else {
    // auto complete the input based on the sites
    const inputArray = input.value.split(" ");
    // TODO: implement ls sublisting
    if (inputArray[0] !== "cd") return;
    const lastWord = inputArray[inputArray.length - 1];
    const matches = sites.value?.filter((site) => site.includes(lastWord));
    if (matches?.length) {
      inputArray[inputArray.length - 1] = matches[0];
      input.value = inputArray.join(" ");
    }
  }
}
</script>
<template>
  <div
    class="terminal transition-transform duration-300 ease-in-out"
    :class="{ 'translate-y-full': !open, 'translate-y-0': open }"
    ref="terminalElement"
  >
    <button
      class="absolute rounded-t -translate-y-full right-4 bg-slate-950 px-4 py-2"
      @click="
        () => {
          open = !open;
          inputElement?.focus();
        }
      "
    >
      <Icon v-if="!open" name="mdi:code-greater-than-or-equal" />
      <Icon v-else name="fa6-solid:angles-down" />
    </button>
    <div
      class="bg-slate-950 max-h-96 overflow-scroll p-4"
      @click="inputElement?.focus()"
      ref="terminal"
    >
      <div class="lines">
        <div v-for="line in lines" class="line">> {{ line }}</div>
      </div>
      <div class="flex gap-1 flex-nowrap">
        <span v-if="contactForm.contactstep > 0" class="min-w-fit"
          >>
          {{ currentStep }}
          $
        </span>
        <span v-else class="min-w-fit">> {{ path }} $ </span>
        <input
          class="bg-slate-950 appearance-none outline-none w-full"
          type="text"
          @keyup.enter="submit"
          @keydown.tab.prevent="autocomplete"
          v-model="input"
          ref="inputElement"
        />
      </div>
    </div>
  </div>
</template>