FROM elixir:latest

RUN apt -y update \
  && apt -y upgrade \
  && apt install -y bash curl git build-essential inotify-tools

RUN mix local.hex --force && \
    mix local.rebar --force