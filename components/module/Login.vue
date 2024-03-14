<script lang="ts" setup>
import VueWriter from "vue-writer";
const supabase = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
const referrer = useRoute().query.referrer as string;
const user = useSupabaseUser();
const loading = ref(false);
const typer = ref(null);
const loginDone = ref(false);
const error = ref("");
const errorHappened = useState("errorHappened", () => false);

if (user.value) {
  console.log("user", user);
  if (referrer) router.push(referrer);
  else router.push("/home");
}

async function login(event: SubmitEvent) {
  loading.value = true;
  await supabase.auth
    .signInWithPassword({
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      console.log(res);
      if (res.error) {
        errorHappened.value = true;
        error.value = res.error.message;
        return;
      }
      errorHappened.value = false;
      loginDone.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
}
watch(
  () => typer.value?.typeStatus,
  (newStatus, oldStatus) => {
    if (newStatus === false && oldStatus === true) {
      // wait for 1 second and redirect
      setTimeout(() => {
        if (user.value) {
          if (referrer) router.push(referrer);
          else router.push("/home");
        }
      }, 500);
    }
  }
);
onBeforeRouteLeave(() => {
  errorHappened.value = false;
});
</script>
<template>
  <transition name="zapp-out" mode="out-in">
    <div class="max-w-screen-sm mx-auto">
      <form
        v-if="!user && !loginDone"
        class="grid gap-4 py-4 border-2 border-amber-400 p-4"
        @submit.prevent="login"
      >
        <h1 v-if="!error" class="headline text-4xl text-wrap text-center">
          Login
        </h1>
        <h1 v-else class="headline text-4xl text-wrap text-center">
          <VueWriter
            :array="[error]"
            :iterations="1"
            ref="typer"
            caret="underscore"
            :typeSpeed="50"
          />
        </h1>
        <div class="grid gap-2">
          <label for="email">Email</label>
          <BaseInput
            v-model="email"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
          />
        </div>
        <div class="grid gap-2">
          <label for="password">Password</label>
          <BaseInput
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
          />
        </div>
        <div class="grid gap-4 mt-4">
          <BaseButton type="submit" value="signUp" :loading="loading"
            >Login</BaseButton
          >
        </div>
      </form>
      <h1
        v-else-if="user && loginDone"
        class="headline text-4xl text-wrap text-center"
      >
        <VueWriter
          :array="[`Hello, ${user?.email}`]"
          :iterations="1"
          ref="typer"
          caret="underscore"
          :typeSpeed="50"
        />
      </h1>
      <div v-else class="w-full">
        <BaseButton loading class="w-full" disabled>Loading</BaseButton>
      </div>
    </div>
  </transition>
</template>
