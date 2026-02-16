#!/usr/bin/env sh
set -eu

SOURCE_DIR="${SOURCE_DIR:-dist-site}"
LIVE_DIR="${LIVE_DIR:-../httpdocs}"

if [ ! -f "${SOURCE_DIR}/index.html" ]; then
  echo "Fehler: ${SOURCE_DIR}/index.html nicht gefunden."
  exit 1
fi

mkdir -p "${LIVE_DIR}"

if [ "${LIVE_DIR}" = "/" ] || [ "${LIVE_DIR}" = "." ]; then
  echo "Fehler: unsicheres LIVE_DIR (${LIVE_DIR})."
  exit 1
fi

rm -rf "${LIVE_DIR}"/*
cp -R "${SOURCE_DIR}"/. "${LIVE_DIR}"/

if [ ! -f "${LIVE_DIR}/index.html" ]; then
  echo "Fehler: Deployment fehlgeschlagen, index.html fehlt in ${LIVE_DIR}."
  exit 1
fi

echo "Deployment erfolgreich: ${SOURCE_DIR} -> ${LIVE_DIR}"