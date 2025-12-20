import { XIcon, Trash2Icon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Košarica</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-muted transition"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Košarica je prazna. Dodaj nekaj izdelkov. 🙂
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-4 last:border-b-0"
              >
                {/* Slika */}
                <div className="h-20 w-20 rounded-md bg-muted overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground px-2 text-center">
                      Brez slike
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <button
                        className="p-1 rounded-full hover:bg-muted transition"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2Icon className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Skupaj</span>
            <span className="text-lg font-semibold">
              {total.toFixed(2)} €
            </span>
          </div>
          <Button className="w-full h-11 rounded-xl">
            Nadaljuj na naročilo
          </Button>
        </div>
      </aside>
    </>
  );
}
