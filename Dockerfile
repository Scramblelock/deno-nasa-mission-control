FROM hayd/deno:alpine-1.2.0 

WORKDIR /app

USER deno

COPY --chown=deno:deno . .

CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]

EXPOSE 8000