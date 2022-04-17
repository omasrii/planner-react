#!/bin/sh

TAG_TIMESTAMP=$(date +"%d%m%Y%H%M")
REPO='REPO HERE'
# OSXVer=$(sw_vers)
# LinuxVer=$(cat /etc/os-release)


# Build for ARM
docker buildx build --platform linux/arm/v7 -t "$REPO/planner-nginx:armv7-$TAG_TIMESTAMP" -t "$REPO/planner-nginx:armv7-latest" --push .
# Build for X86
docker buildx build -t "$REPO/planner-nginx:x86-$TAG_TIMESTAMP" -t "$REPO/planner-nginx:x86-latest" --push .

