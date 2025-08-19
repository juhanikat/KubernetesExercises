To deploy:

1. Change the `newName` properties inside `kustomization.yaml` to the image names of the frontend and backend images you want to use.
2. Run `kubectl apply -k .`