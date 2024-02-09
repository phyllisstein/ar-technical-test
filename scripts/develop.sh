#!/usr/bin/env bash

set -Eeuxo pipefail

args="$*"

restart_server() {
  echo "Terminate existing server..."
  pkill -f "yarn.js start:dev" || true

  echo "Starting development server..."
  yarn start:dev
  disown
}

configure_watches() {
  echo "Configuring watches..."

  watchman watch-project /app
  for j in scripts/watchman/*.json; do
    echo "Setting watch $j"
    watchman -j <"$j"
  done
}

watch_watchman() {
  echo "Logging watchman..."
  configure_watches
  tail -f /usr/local/var/run/watchman/root-state/log
}

yarn_install() {
  # [[ -e "/run/yarn.lock" ]] && exit 0
  # [[ -e "/run/secrets/environment" ]] || { echo "Missing environment secrets." && exit 1; }
  echo "Running yarn install..."
  # touch /run/yarn.lock
  # source /run/secrets/environment && export FONT_AWESOME_NPM_TOKEN GITHUB_TOKEN GSAP_NPM_TOKEN
  yarn install
  # rm /run/yarn.lock
}

case $args in
serve)
  restart_server
  ;;

watch)
  watch_watchman
  ;;

watches)
  configure_watches
  ;;

yarn)
  yarn_install
  restart_server
  ;;

*)
  echo "Unknown command: $args"
  ;;
esac
