type MessageCallback = (value: any) => void;

interface MessageEvent {
  data: {
    action: string;
    value: any;
  };
}

class IFrameMessageSystem {
  private subscribers: Map<string, Set<MessageCallback>>;

  constructor() {
    this.subscribers = new Map();
    this.handleMessage = this.handleMessage.bind(this);
    window.addEventListener('message', this.handleMessage as unknown as EventListener);
  }

  subscribe(action: string, callback: MessageCallback): () => void {
    if (!this.subscribers.has(action)) {
      this.subscribers.set(action, new Set());
    }
    this.subscribers.get(action)!.add(callback);
    return () => this.unsubscribe(action, callback);
  }

  unsubscribe(action: string, callback: MessageCallback): void {
    if (this.subscribers.has(action)) {
      this.subscribers.get(action)!.delete(callback);
    }
  }

  publish(iframe: HTMLIFrameElement, action: string, data: any, timeout: number = 10000): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        unsubscribe();
        reject(new Error('Iframe message timeout'));
      }, timeout);

      const responseAction = action; // 使用相同的 action 名称
      const responseHandler = (response: any) => {
        clearTimeout(timeoutId);
        unsubscribe();
        resolve(response);
      };

      const unsubscribe = this.subscribe(responseAction, responseHandler);

      iframe.contentWindow?.postMessage({
        action,
        body: data
      }, '*');
    });
  }

  private handleMessage(event: MessageEvent): void {
    const { action, value } = event.data;
    if (this.subscribers.has(action)) {
      this.subscribers.get(action)!.forEach(callback => callback(value));
    }
  }
}

export const iframeMessageSystem = new IFrameMessageSystem();