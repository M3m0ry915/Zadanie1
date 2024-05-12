# Część dodatkowa (etap2)

## Należy podać polecenia:

### Logowanie do DockerHub:
docker login

### Utworzenie buildx builder:
docker buildx create --name zad1 --driver docker-container

### Ustawienie buildx builder jako aktywny:
docker buildx use zad1


### Wykonanie polecenia:
docker buildx inspect --bootstrap   

### Zbudowanie obrazu dla obu platform:
docker buildx build --platform linux/amd64,linux/arm64 \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --push -t hubertsikora/zad1dod:v1 .
