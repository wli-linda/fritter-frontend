<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {NavBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
      this.$store.commit('setUserId', user ? user._id : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

main {
  padding: 0 12em 5em;
  background-color: rgb(233, 239, 236);
  color: rgb(31, 81, 15);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

button {
  border: 1px rgb(31, 81, 15);
  background-color: rgba(237, 246, 242, 0.536);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(31, 81, 15);
  padding: 0.75em;
  margin: 0.5em;
  box-shadow: 1px 1px rgba(32, 81, 15, 0.779);
  border-radius: 0.2em;
  cursor: pointer;
}

button:hover {
  background-color: white;
  transition: 0.5s;
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgba(166, 23, 33, 0.667);
}

.alerts .success {
    background-color: rgba(45, 135, 87, 0.667);
}

@media screen and (max-width: 999px) {
  main {
    padding: 0 3em 5em;
  }
}

</style>
