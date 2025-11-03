#!/usr/bin/env sh
# wait-for-it.sh — attend qu’un service TCP soit dispo

host="$1"
port="$2"
shift 2

until nc -z "$host" "$port"; do
  echo "⏳ Waiting for $host:$port..."
  sleep 2
done

echo "✅ $host:$port is up — executing command"
exec "$@"
