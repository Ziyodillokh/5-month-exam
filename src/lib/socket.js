// socket.io uchun bir nimalardan foydalandim 🧑‍💻

const { Server } = require("socket.io");

class SocketService {
  #io;
  #onlineUsers = new Map();
  // init metodi socket.io serverini boshqarishning barcha asosiy vazifalarini amalga oshirish uchun kerak bo'larkan
  init(server) {
    this.#io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.#io.on("connection", (socket) => {
      const userIndex = this.#onlineUsers.size + 1;
      this.#onlineUsers.set(socket.id, userIndex);
      this.broadcastOnlineUsers();

      socket.on("send", (data) => {
        const message = {
          message: data.message,
          from: userIndex,
        };
        this.#io.emit("message", { data: message });
      });

      socket.on("disconnect", () => {
        this.#onlineUsers.delete(socket.id);
        this.broadcastOnlineUsers();
      });
    });
  }

  broadcastOnlineUsers() {
    // from foydalanuvchi tomonidan yuborilgan xabarning qayerdan kelganini  aniqlash uchun ishlatilarkan 
    // values Map obyektidagi barcha qiymatlarni olish uchun ishlatilarkan (yangilik 😁)
    const onlineUserIndexes = Array.from(this.#onlineUsers.values());
    this.#io.emit("onlineUsers", { data: onlineUserIndexes });
  }
}

const socketService = new SocketService();
module.exports = { socketService };
