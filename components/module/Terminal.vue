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
const lines = ref<Array<string>>([]);
const pastCommands = ref<Array<string>>([]);
// for scrolling to pastCommands
const scrollPostion = ref(0);

const inputElement = ref<HTMLElement | null>(null);
const terminal = ref<HTMLElement | null>(null);
const terminalElement = ref<HTMLElement | null>(null);
const input = ref("");
const router = useRouter();
const route = useRoute();
const { cmd, ctrl, k, c } = useMagicKeys();
const availableCommands = ["help", "cd", "ls", "clear", "contact"];
const { gtag, disableAnalytics, enableAnalytics, initialize } = useGtag();
const cookies = useCookie("consent", { maxAge: 60 * 60 * 24 * 30 });
const showConsent = ref(false);
const currentStep = ref("");
const contactForm = reactive({
  contactstep: 0,
  contactsteps: 5,
  firstname: "",
  lastname: "",
  email: "",
  message: "",
});

const path = computed({
  get: () => route.fullPath,
  set: (newPath) => {
    router.push(newPath);
  },
});

onClickOutside(terminalElement, () => {
  if (open.value) open.value = false;
});

//#region keyboard shortcuts
watchEffect(() => {
  if ((cmd.value && k.value) || (ctrl.value && k.value)) {
    open.value = !open.value;
    gtag("event", "use-shortkcut-to-open");
  }
});

watchEffect(() => {
  if (ctrl.value && c.value) {
    input.value = "";
    if (contactForm.contactstep > 0) {
      gtag("event", "abort-contact-form");
      lines.value.push("Contact form canceled");
      contactForm.contactstep = 0;
      currentStep.value = "";
    }
  }
});
//#endregion

//#region init
// fetch navigation items based on path
const { data: navigation } = await useAsyncData(
  "navigation-terminal",
  () => queryCollectionNavigation('blog'),
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
//#endregion

//#region watch init command on terminal open
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
    if (!isOpen) {
      if (contactForm.contactstep > 0) {
        gtag("event", "abort-contact-form");
        lines.value.push("Contact form canceled");
        contactForm.contactstep = 0;
        currentStep.value = "";
      }
    }
  });
});
//#endregion

//#region cookie consent
async function startConsent() {
  showConsent.value = true;
  open.value = true;
  inputElement.value?.focus();
  await until(cookies).toBe(true);
  showConsent.value = false;
}

function submitCookie(value?: "n" | "y") {
  const localInput = value || input.value.toLocaleLowerCase();
  if (localInput === "y" || localInput === "yes") {
    initialize();
    enableAnalytics();
    showConsent.value = false;
    open.value = false;
    cookies.value = "accepted";
  } else if (localInput === "n" || localInput === "no") {
    cookies.value = "rejected";
    disableAnalytics();
    showConsent.value = false;
    open.value = false;
  }
}
//#endregion

//#region first visit

if (!cookies.value) {
  startConsent();
}
//#endregion

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
  // If contact flow is active, handle the input
  if (contactForm.contactstep > 0) {
    switch (contactForm.contactstep) {
      case 1:
        contactForm.firstname = input.value;
        currentStep.value = "Lastname:";
        lines.value.push("Enter Lastname");
        gtag("event", "contact-form-firstname");
        break;
      case 2:
        contactForm.lastname = input.value;
        currentStep.value = "Email:";
        lines.value.push("Enter Email");
        gtag("event", "contact-form-lastname");
        break;
      case 3:
        contactForm.email = input.value;
        currentStep.value = "Message:";
        lines.value.push("Enter Message");
        gtag("event", "contact-form-email");
        break;
      case 4:
        contactForm.message = input.value;
        currentStep.value = "";
        gtag("event", "contact-form-message");
        $fetch("/api/send", {
          method: "POST",
          body: JSON.stringify(contactForm),
        })
          .then((res) => {
            if (res.error) {
              lines.value.push("Error sending message");
              console.error(res.error);
            } else lines.value.push("Contact form submitted!");
          })
          .catch((e) => {
            lines.value.push("Error sending message");
            console.error(e);
          })
          .finally(() => {
            contactForm.contactstep = 0;
            input.value = "";
            gtag("event", "contact-form-send");
          });

        return;
      default:
        break;
    }
    contactForm.contactstep++;
    input.value = "";
    return;
  }

  pastCommands.value.push(input.value);
  scrollPostion.value = pastCommands.value.length;
  lines.value.push(input.value);

  // check input for available commands
  switch (true) {
    // cd to path based on regex
    case /^cd\s+\/?[\w-]+/.test(input.value.toLocaleLowerCase()):
      const newPath = input.value.toLocaleLowerCase().split(" ")[1];
      if (
        sites.value?.includes(newPath) ||
        sites.value?.includes("/" + newPath)
      ) {
        path.value = newPath;
      } else {
        lines.value.push(`cd: no such file or directory: ${newPath}`);
      }
      gtag("event", "terminal-cd");
      break;
    // cd to upper directory
    case /^cd\s+\.\./.test(input.value.toLocaleLowerCase()):
      const parentPath = path.value.split("/").slice(0, -1).join("/");
      if (sites.value?.includes(parentPath)) {
        path.value = parentPath;
      } else if (!parentPath) {
        path.value = "/";
      } else {
        lines.value.push(`cd: no such file or directory: ${parentPath}`);
      }
      gtag("event", "terminal-cd");
      break;
    // list all sites
    case /^ls/.test(input.value.toLocaleLowerCase()):
      lines.value.push(sites.value?.join(" ") || "");
      gtag("event", "terminal-ls");
      break;
    // clear terminal
    case /^clear/.test(input.value.toLocaleLowerCase()):
      lines.value = [];
      gtag("event", "terminal-clear");
      break;

    // case contact
    case /^contact/.test(input.value):
      lines.value.push("Starting contact form...");
      lines.value.push("Enter Firstname");
      currentStep.value = "Firstname:";
      contactForm.contactstep = 1;
      gtag("event", "terminal-contact-start");
      break;
    // case cookies
    case /^cookies/.test(input.value):
      startConsent();
      break;
    // case help
    case /^help/.test(input.value.toLocaleLowerCase()):
      lines.value.push(
        "Available commands:",
        "cd [path] - change directory",
        "ls - list all sites",
        "clear - clear terminal",
        "cookies - manage cookies",
        "contact - open interactive contact form"
      );
      gtag("event", "terminal-help");
      break;

    default:
      lines.value.push(
        `command not found: ${input.value.toLocaleLowerCase()}. Try 'help'`
      );
      gtag("event", "terminal-command-not-found", {
        value: input.value.toLocaleLowerCase(),
      });
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

function scrollToPastCommands(direction: "up" | "down") {
  if (contactForm.contactstep > 0) return;
  if (pastCommands.value.length <= 0) return;
  if (direction === "up") {
    if (scrollPostion.value > 0) {
      scrollPostion.value--;
    }
  } else if (direction === "down") {
    if (scrollPostion.value < pastCommands.value.length) {
      scrollPostion.value++;
    }
  }
  input.value = pastCommands.value[scrollPostion.value] || "";
}
</script>
<template>
  <div
    class="terminal transition-transform duration-300 ease-in-out"
    :class="{ 'translate-y-full': !open, 'translate-y-0': open }"
    ref="terminalElement"
  >
    <button
      class="absolute rounded-t -translate-y-full right-4 bg-slate-950 px-4 py-4"
      @click="
        () => {
          open = !open;
          inputElement?.focus();
          gtag('event', 'terminal-toggle');
        }
      "
    >
      <NuxtIcon v-if="!open" name="code-greater-than-or-equal" />
      <NuxtIcon v-else name="angles-down" />
    </button>
    <div
      class="bg-slate-950 max-h-96 overflow-auto p-4"
      @click="inputElement?.focus()"
      ref="terminal"
    >
      <template v-if="!showConsent">
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
            @keydown.arrow-up.prevent="scrollToPastCommands('up')"
            @keydown.arrow-down.prevent="scrollToPastCommands('down')"
            v-model="input"
            ref="inputElement"
            autofocus
            autocapitalize="off"
            spellcheck="false"
            autocorrect="off"
            autocomplete="off"
          />
        </div>
      </template>
      <template v-else>
        <div class="consent">
          <div class="grid justify-between gap-1">
            <p class="min-w-min">Warning: Cookies detected! Accept (Y/n)?</p>
            <div class="flex gap-2 justify-around">
              <button @click="submitCookie('y')">(y) Yes</button>
              <button @click="submitCookie('n')">(n) No</button>
            </div>
          </div>
          <input
            class="bg-slate-950 appearance-none outline-none w-full"
            type="text"
            @keyup.enter="submitCookie(undefined)"
            v-model="input"
            ref="inputElement"
            autofocus
            autocapitalize="off"
            spellcheck="false"
            autocorrect="off"
            autocomplete="off"
          />
        </div>
      </template>
    </div>
  </div>
</template>
