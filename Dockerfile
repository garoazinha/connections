FROM elixir:latest

ARG NODE_VERSION=20.10.0

RUN apt -y update \
  && apt -y upgrade \
  && apt install -y bash curl git build-essential inotify-tools sqlite3

ENV NVM_DIR /nvm
RUN mkdir -p ${NVM_DIR} \
  && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash \
  && . $NVM_DIR/nvm.sh \
  && nvm install ${NODE_VERSION} \
  && nvm alias default ${NODE_VERSION} \
  && nvm use default \
  && npm install -g yarn


ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN mix local.hex --force && \
    mix local.rebar --force