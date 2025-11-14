import { NetworkErrorLoader } from './NetworkErrorLoader';
import type { NetworkErrorProps } from './NetworkErrorLoader';

export default function NetworkError({error, reset}: NetworkErrorProps) {
    return <NetworkErrorLoader error={error} reset={reset} />;
}